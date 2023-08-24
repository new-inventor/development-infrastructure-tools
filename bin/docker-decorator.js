const fs = require('fs');
const path = require('path');
const {Command, Option} = require("commander");
const config = require("../config.json");
const {execute} = require('./execute-helper');

const program = new Command();
const runDir = process.cwd();
const projectConfig = JSON.parse(fs.readFileSync(path.join(runDir, 'proj.json')).toString());
const infrastructureDir = path.join(runDir, projectConfig.infrastructureDir);
const dockerComposeConfigurationsDir = path.join(infrastructureDir, 'docker-compose');
const infrastructureEnvsDir = path.join(infrastructureDir, 'env');
const packagesDirs = projectConfig.packageDirs.reduce((acc, item) => {
  acc.set(item, path.join(runDir, item));
  return acc;
}, new Map());
const uName = process.env.PATH.includes(';') ? 'windows' : 'linux';

program
  .name('docker-decorator')
  .description('Cli to run services as containers')
  .version('0.0.1');
program
  .command('start')
  .description('Start docker-compose configuration')
  .argument('<configuration-name>', 'Docker compose configuration name')
  .action((configurationName) => {
    execute(`docker compose -f ${path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-${uName}.yaml`)} --env-file ${path.join(infrastructureEnvsDir, `.env.${configurationName}`)} -p ${projectConfig.projectName}-${configurationName} up --build -d`)
      .then(() => console.log('Done'))
      .catch((error) => console.log(error));
  });
program
  .command('stop')
  .description('Stop docker-compose configuration')
  .argument('<configuration-name>', 'Docker compose configuration name')
  .action((configurationName) => {
    execute(`docker compose -f ${path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-${uName}.yaml`)} --env-file ${path.join(infrastructureEnvsDir, `.env.${configurationName}`)} -p ${projectConfig.projectName}-${configurationName} down`)
      .then(() => console.log('Done'))
      .catch((error) => console.log(error));
  });
program
  .command('run')
  .description('Run command on docker-compose configuration container')
  .argument('<configuration-name>', 'Docker compose configuration name')
  .argument('<service-name>', 'Docker compose service name')
  .option('-c, --command <command>', 'Command to run inside the container')
  .action((configurationName, serviceName, options) => {
    execute(`docker compose -f ${path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-${uName}.yaml`)} --env-file ${path.join(infrastructureEnvsDir, `.env.${configurationName}`)} -p ${projectConfig.projectName}-${configurationName} run ${serviceName} ${options.command}`)
      .then(() => console.log('Done'))
      .catch((error) => console.log(error));
  });

program.parse();
