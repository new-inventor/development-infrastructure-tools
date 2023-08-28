#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import {Command} from "commander";
import {execute} from './execute-helper';
import {stringify} from 'yaml';
import chalk from 'chalk';

const program = new Command();
const runDir = process.cwd();
const projectConfig = JSON.parse(fs.readFileSync(path.join(runDir, 'proj.json')).toString());
const infrastructureDir = path.join(runDir, projectConfig.infrastructureDir);
const dockerComposeConfigurationsDir = path.join(infrastructureDir, 'docker-compose');
const infrastructureEnvsDir = path.join(infrastructureDir, 'env');
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
      .then(() => console.log(chalk.green('Done')))
      .catch((error) => console.error(chalk.red(error)));
  });
program
  .command('stop')
  .description('Stop docker-compose configuration')
  .argument('<configuration-name>', 'Docker compose configuration name')
  .action((configurationName) => {
    execute(`docker compose -f ${path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-${uName}.yaml`)} --env-file ${path.join(infrastructureEnvsDir, `.env.${configurationName}`)} -p ${projectConfig.projectName}-${configurationName} down`)
      .then(() => console.log(chalk.green('Done')))
      .catch((error) => console.error(chalk.red(error)));
  });
program
  .command('run')
  .description('Run command on docker-compose configuration container')
  .argument('<configuration-name>', 'Docker compose configuration name')
  .argument('<service-name>', 'Docker compose service name')
  .option('-c, --command <command>', 'Command to run inside the container')
  .action((configurationName, serviceName, options) => {
    execute(`docker compose -f ${path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-${uName}.yaml`)} --env-file ${path.join(infrastructureEnvsDir, `.env.${configurationName}`)} -p ${projectConfig.projectName}-${configurationName} run ${serviceName} ${options.command}`)
      .then(() => console.log(chalk.green('Done')))
      .catch((error) => console.error(chalk.red(error)));
  });
program
  .command('create-conf')
  .description('create new docker compose configuration')
  .argument('<configuration-name>', 'Docker compose configuration name')
  .option('-s, --services <services...>', 'Services list to add to configuration')
  .option('-n, --networks <networks...>', 'Networks list to add to configuration')
  .option('-v, --volumes <volumes...>', 'Inner volumes list to add to configuration')
  .action((configurationName, options) => {
    const config = {
      version: '3.9',
      services: {},
    }
    config.services = options.services.reduce((acc, item) => ({...acc, [item]: {}}), {});
    config.networks = options.networks.reduce((acc, item) => ({...acc, [item]: null}), {});
    config.volumes = options.volumes.reduce((acc, item) => ({...acc, [item]: null}), {});
    fs.writeFileSync(path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-linux.yaml`), stringify(config));
    fs.writeFileSync(path.join(dockerComposeConfigurationsDir, `docker-compose.${configurationName}-windows.yaml`), stringify(config));
    console.log(chalk.green('Done'));
  });

program.parse();
