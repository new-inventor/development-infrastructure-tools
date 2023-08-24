const fs = require('fs');
const path = require('path');
const {Command, Option, Argument} = require("commander");
const config = require("../config.json");
const {execute, getCommandRes} = require('./execute-helper');
const {createPackageJson} = require('./package-json-generator');

const program = new Command();
const runDir = process.cwd();
const projectConfig = JSON.parse(fs.readFileSync(path.join(runDir, 'proj.json')).toString());
const infrastructureDir = path.join(runDir, projectConfig.infrastructureDir);
const dockerComposeConfigurationsDir = path.join(infrastructureDir, 'docker-compose');
const infrastructureEnvsDir = path.join(infrastructureDir, 'env');
const packagesDirs = projectConfig.packageDirs.reduce((acc, item) => ({...acc, [item]: path.join(runDir, item)}), {});
const uName = process.env.PATH.includes(';') ? 'windows' : 'linux';

program
  .name('package-helper')
  .description('Cli to help work with yarn workspaces packages')
  .version('0.0.1');
program
  .command('run')
  .description('Start package in dev mode')
  .argument('<package-name>', 'Package name to start')
  .argument('<action>', 'Action to do')
  .action((packageName, action) => {
    execute('yarn', ['workspace', `@${projectConfig.projectName}/${packageName}`, action], true)
      .then(() => console.log('Done'))
      .catch((error) => console.log(error));
  });
program
  .command('create')
  .description('Create package in specified directory')
  .addArgument(new Argument('<root-dir>', 'Directory to create package in').choices(Object.keys(packagesDirs)))
  .argument('<name>', 'Name of the package')
  .option('-d, --description <description>', 'Package description', '')
  .option('-a, --author <author>', 'Package author', '')
  .action((packageRootDir, packageName, options) => {
    const packageDir = path.join(runDir, packageRootDir, packageName);
    const templatesDir = path.resolve(path.join(__dirname, '..', 'templates', 'generator_templates'));
    fs.mkdirSync(packageDir);
    fs.cpSync(path.join(templatesDir, '.gitignore.template'), path.join(packageDir, '.gitignore'));
    fs.cpSync(path.join(templatesDir, '.dockerignore.template'), path.join(packageDir, '.dockerignore'));
    fs.cpSync(path.join(templatesDir, 'Dockerfile.template'), path.join(packageDir, '.Dockerfile'));
    fs.cpSync(path.join(templatesDir, '.lintstagedrc.json.template'), path.join(packageDir, '.lintstagedrc.json'));
    fs.cpSync(path.join(templatesDir, '.prettierrc.template'), path.join(packageDir, '.prettierrc'));
    fs.writeFileSync(path.join(packageDir, 'README.md'), `# ${packageName}`);
    createPackageJson(templatesDir, packageDir, false, {
      name: `@${projectConfig.projectName}/${packageName}`,
      author: options.author,
      description: options.description,
      yarn1: projectConfig.isYarn1,
    });
  });
// program
//   .command('run')
//   .description('Run command on docker-compose configuration container')
//   .argument('<configuration-name>', 'Docker compose configuration name')
//   .argument('<service-name>', 'Docker compose service name')
//   .option('-c, --command <command>', 'Command to run inside the container')
//   .action((configurationName, serviceName, options) => {
//     execute(`docker compose -f ${path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-${uName}.yaml`)} --env-file ${path.join(infrastructureEnvsDir, `.env.${configurationName}`)} -p ${projectConfig.projectName}-${configurationName} run ${serviceName} ${options.command}`)
//       .then(() => console.log('Done'))
//       .catch((error) => console.log(error));
//   });

program.parse();
