#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import config from './config.json';
import { stringify } from 'yaml';
import chalk from 'chalk';
import { execute } from './execute-helper';
import { createPackageJson } from './package-json-generator';
import { Command, Option } from 'commander';

interface CommandOptions {
  name: string;
  packagesDirs: string[];
  infrastructureDir: string;
  description: string;
  author: string;
  repo: false | string;
  yarnPlugins: string[];
  force: boolean;
  yarn1: boolean;
}

const initYarn1 = async (projectDir: string) => {
  console.log('Initialise Yarn v1');
  await execute('git', ['init']);
  fs.writeFileSync(
    path.join(projectDir, '.gitignore'),
    `/node_modules
npm-debug.log
yarn-error.log
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*`
  );
};

const initYarn3 = async (yarnPlugins: string[]) => {
  console.log('Initialise Yarn v3');
  await execute('corepack', ['enable']);
  await execute('corepack', ['prepare', 'yarn@stable', '--activate']);
  await execute('yarn', ['init', '-2']);
  await execute('yarn', ['set', 'version', 'stable']);
  await execute('yarn', ['config', 'set', 'nodeLinker', 'node-modules']);
  const pluginsLength = yarnPlugins.length;
  if (!!pluginsLength) {
    for (let i = 0; i < pluginsLength; i++) {
      await execute('yarn', ['plugin', 'import', yarnPlugins[i]], true);
    }
  }
  fs.appendFileSync('.gitignore', 'node_modules');
};

const initInfrastructureDir = (projectDir: string, infrastructureDirName: string) => {
  console.log('Initialise infrastructure directory');
  const infrastructureDir = path.join(projectDir, infrastructureDirName);
  fs.mkdirSync(infrastructureDir);
  fs.writeFileSync(path.join(infrastructureDir, '.gitignore'), 'env/.env.prod');
  const envDir = path.join(infrastructureDir, 'env');
  fs.mkdirSync(envDir);
  fs.writeFileSync(path.join(envDir, '.env.dev'), 'NODE_ENV=development');
  fs.writeFileSync(path.join(envDir, '.env.prod'), 'NODE_ENV=production');
  const composeDir = path.join(infrastructureDir, 'docker-compose');
  fs.mkdirSync(composeDir);
  const composeTemplate = { version: '3.9', services: {} };
  fs.writeFileSync(path.join(composeDir, 'docker-compose.dev-linux.yaml'), stringify(composeTemplate));
  fs.writeFileSync(path.join(composeDir, 'docker-compose.dev-windows.yaml'), stringify(composeTemplate));
  fs.writeFileSync(path.join(composeDir, 'docker-compose.prod-linux.yaml'), stringify(composeTemplate));
};

const createPackagesDirs = (projectDir: string, packagesDirs: string[]) => {
  console.log('Create packages directories');
  packagesDirs.forEach((item) => fs.mkdirSync(path.join(projectDir, item)));
};

const createProjectConfig = (projectDir: string, params: CommandOptions) => {
  fs.writeFileSync(
    path.join(projectDir, 'proj.json'),
    JSON.stringify(
      {
        projectName: params.name,
        packageDirs: params.packagesDirs,
        infrastructureDir: params.infrastructureDir,
        isYarn1: params.yarn1,
        repo: params.repo,
      },
      null,
      2
    )
  );
};

const initGit = async (repo: boolean | string) => {
  await execute('git', ['add', '.']);
  await execute('git', ['commit', '-m', '"start"']);
  if (repo) {
    await execute('git', ['remote', 'add', 'origin', '${repo}']);
    await execute('git', ['push', '--set-upstream', 'origin', 'master']);
  }
};

const createProjectDir = (projectDir: string, force: boolean) => {
  if (force) {
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
  fs.mkdirSync(projectDir);
};

const createReamMe = (projectDir: string, params: CommandOptions) => {
  fs.writeFileSync(path.join(projectDir, 'README.md'), params.name);
};

async function main(params: CommandOptions) {
  const projectDir = path.join(process.cwd(), params.name);
  createProjectDir(projectDir, params.force);
  console.log('Go to project dir: ', projectDir);
  process.chdir(projectDir);
  initInfrastructureDir(projectDir, params.infrastructureDir);
  createPackagesDirs(projectDir, params.packagesDirs);
  createReamMe(projectDir, params);
  createProjectConfig(projectDir, params);
  if (params.yarn1) {
    await initYarn1(projectDir);
  } else {
    await initYarn3(params.yarnPlugins);
  }
  createPackageJson(
    {
      browserslist: ['defaults', '> .3%'],
      devDependencies: {
        husky: '^8.0.3',
        'lint-staged': '^13.2.1',
        pinst: '^3.0.0',
      },
      scripts: {
        'husky:install': 'husky install',
        prepack: 'pinst --disable',
        postpack: 'pinst --enable',
        lint: 'git add . && yarn workspaces run lint-staged',
        test: 'yarn workspaces run jest --watchAll=false --passWithNoTests',
      },
    },
    projectDir,
    true,
    params
  );
  await execute('yarn', ['install'], true);
  await initGit(params.repo);
}

const program = new Command();

program
  .name('create-app')
  .description('Cli to initialize project with yarn workspaces')
  .version('0.0.1')
  .requiredOption('-n, --name <name>', 'Project and directory name', config.defaultProjectName)
  .option(
    '-p, --packages-dirs <packages-dirs...>',
    'Packages directories names for logic segregation',
    config.packagesDirs
  )
  .option('-i, --infrastructure-dir <infrastructure-dir>', 'infrastructure directory path', config.infrastructureDir)
  .option('-d, --description <description>', 'Project description', '')
  .option('-a, --author <author>', 'Project author', '')
  .option('-r, --repo <repo>', 'Project repository address')
  .addOption(
    new Option('--yarn-plugins <yarn-plugins...>', 'Yarn 3 plugins list').default(config.yarnPlugins).conflicts('yarn1')
  )
  .option('-f, --force', 'Force recreate')
  .option('--yarn1', 'Initialize yarn 1 project')
  .parse();

main(program.opts())
  .then(() => {
    console.log(chalk.green('Done'));
  })
  .catch((error) => {
    console.error(chalk.red(error));
  });
