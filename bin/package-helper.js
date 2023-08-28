#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import {Command, Option, Argument} from "commander";
import {execute} from './execute-helper';
import {createPackageJson} from './package-json-generator';
import chalk from 'chalk';

const program = new Command();
const runDir = process.cwd();
const projectConfig = JSON.parse(fs.readFileSync(path.join(runDir, 'proj.json')).toString());
const packagesDirs = projectConfig.packageDirs.reduce((acc, item) => ({...acc, [item]: path.join(runDir, item)}), {});

program
  .name('package-helper')
  .description('Cli to help work with yarn workspaces packages')
  .version('0.0.1');
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
program
  .command('delete')
  .description('Delete package from project')
  .argument('<package-name>', 'Package name to run action on')
  .action(async (packageName) => {
    const len = projectConfig.packageDirs.length || 0;
    for (let i = 0; i < len; i++) {
      const rootDir = path.join(runDir, projectConfig.packageDirs[i]);
      const hasPackage = fs.readdirSync(rootDir, {withFileTypes: true})
        .find(dirent => dirent.isDirectory() && dirent.name === packageName)
      if (hasPackage) {
        fs.rmSync(path.join(rootDir, packageName), {recursive: true, force: true});
        console.log(chalk.green('Done'));
        return;
      }
    }
    throw new Error(`Package "${packageName}" not found in packages directories: "${projectConfig.packageDirs.join('", "')}"`);
  });
program
  .command('run')
  .description('Start package in dev mode')
  .argument('<package-name>', 'Package name to run action on')
  .argument('<action>', 'Action to do')
  .action((packageName, action) => {
    return execute('yarn', ['workspace', `@${projectConfig.projectName}/${packageName}`, action], true)
      .then(() => console.log(chalk.green('Done')))
      .catch((error) => console.error(chalk.red(error)));
  });
program
  .command('add')
  .description('Add dependency to package')
  .argument('<package-name>', 'Package name to add package to')
  .addOption(new Option('-d, --dependencies <dependencies...>', 'Package dependencies list').default([]))
  .addOption(new Option('-e, --dev-dependencies <dev-dependencies...>', 'Package dev dependencies list').default([]))
  .addOption(new Option('-p, --peer-dependencies <peer-dependencies...>', 'Package peer dependencies list').default([]))
  .addOption(new Option('-o, --optional-dependencies <optional-dependencies...>', 'Package optional dependencies list').default([]))
  .action(async (packageName, options) => {
    try {
      if (options.dependencies.length > 0) {
        await execute(`yarn`, ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', ...options.dependencies], true);
        console.log(chalk.green('Dependencies installed'));
      }
      if (options.devDependencies.length > 0) {
        await execute(`yarn`, ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', '-D', ...options.devDependencies], true);
        console.log(chalk.green('Dev dependencies installed'));
      }
      if (options.peerDependencies.length > 0) {
        await execute(`yarn`, ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', '-P', ...options.peerDependencies], true);
        console.log(chalk.green('Peer dependencies installed'));
      }
      if (options.optionalDependencies.length > 0) {
        await execute(`yarn`, ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', '-O', ...options.optionalDependencies], true);
        console.log(chalk.green('Optional dependencies installed'));
      }
    } catch (error) {
      console.error(chalk.red(error));
    }
  });
program
  .command('remove')
  .description('Remove dependency from package')
  .argument('<package-name>', 'Package name to remove package from')
  .argument('<dependencies...>', 'Package dependencies to remove')
  .action((packageName, dependencies) => {
    if(dependencies.length > 0) {
      return execute(`yarn`, ['workspace', `@${projectConfig.projectName}/${packageName}`, 'remove', ...dependencies], true)
        .then(() => console.log(chalk.green('Done')))
        .catch((error) => console.error(chalk.red(error)));
    }
  });

program.parse();
