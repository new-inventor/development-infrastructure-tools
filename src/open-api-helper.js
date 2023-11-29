#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command, Argument } = require('commander');
const { execute } = require('./execute-helper');
const chalk = require('chalk');
const { merge } = require('lodash');

const program = new Command();
const runDir = process.cwd();
const projectConfig = JSON.parse(fs.readFileSync(path.join(runDir, 'proj.json')).toString());
const packagesDirs = projectConfig.packageDirs.reduce((acc, item) => ({ ...acc, [item]: path.join(runDir, item) }), {});
const frontGenTemplate = 'typescript-fetch-templates';
const backGenTemplate = 'typescript-nestjs-templates';

const defaultGenerator = {
  output: 'src/api',
  skipValidateSpec: true,
  minimalUpdate: true,
  inputSpec: './test-spec.json',
  enablePostProcessFile: true,
  additionalProperties: {
    sortModelPropertiesByRequiredFlag: false,
  },
  removeOperationIdPrefix: true,
};

const defaultConfig = {
  $schema: 'node_modules/@openapitools/openapi-generator-cli/config.schema.json',
  spaces: 2,
  'generator-cli': {
    version: '7.0.1',
    storageDir: './openapi-generator',
    generators: {},
  },
};

const generateOpenAPIToolsConfig = (generatorKey, generatorName, spec, generationPath, template, configPath) => {
  const res = defaultConfig;
  res['generator-cli']['generators'][generatorKey] = defaultGenerator;
  res['generator-cli']['generators'][generatorKey].generatorName = generatorName;
  res['generator-cli']['generators'][generatorKey].inputSpec = spec;
  if (template) {
    res['generator-cli']['generators'][generatorKey].templateDir = `./templates/${template}`;
  }
  if (generationPath) {
    res['generator-cli']['generators'][generatorKey].output = generationPath;
  }
  fs.writeFileSync(path.join(configPath, 'openapitools.json'), JSON.stringify(res, null, 2));
};

const initFront = (templatesDir, itoolsDir, packageDir, options) => {
  if (options.frontGenerator === 'typescript-fetch') {
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir);
    }
    fs.cpSync(path.join(itoolsDir, frontGenTemplate), path.join(templatesDir, frontGenTemplate), {
      recursive: true,
      force: true,
    });
  }
  generateOpenAPIToolsConfig(
    'front',
    options.frontGenerator,
    options.spec,
    options.dest,
    options.frontGenerator === 'typescript-fetch' ? frontGenTemplate : undefined,
    packageDir
  );
};
const initBack = (templatesDir, itoolsDir, packageDir, options) => {
  if (options.backGenerator === 'typescript-nestjs') {
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir);
    }
    fs.cpSync(path.join(itoolsDir, backGenTemplate), path.join(templatesDir, backGenTemplate), {
      recursive: true,
      force: true,
    });
  }
  generateOpenAPIToolsConfig(
    'back',
    options.frontGenerator,
    options.spec,
    options.dest,
    options.frontGenerator === 'typescript-nestjs' ? backGenTemplate : undefined,
    packageDir
  );
};

program.name('open-api').description('Cli to help work with open api generator').version('0.0.1');
program
  .command('init')
  .description('Create needed files, install packages and add commands')
  .addArgument(new Argument('<root-dir>', 'Directory to create package in').choices(Object.keys(packagesDirs)))
  .argument('<package-name>', 'Package name')
  .option('-f, --front', 'Generate frontend api', true)
  .option('-b, --back', 'Generate backend api', false)
  .option('-d, --dest <destPath>', 'Generation output directory', 'src/api')
  .option('-s, --spec <specPath>', 'Path to specification', '')
  .option('--front-generator <frontGeneratorName>', 'Frontend api generator name', 'typescript-fetch')
  .option('--back-generator <backGeneratorName>', 'Backend api generator name', 'typescript-nestjs')
  .action(async (packageRootDir, packageName, options) => {
    const itoolsDir = path.resolve(path.join(__dirname));
    const packageDir = path.resolve(runDir, packageRootDir, packageName);
    const templatesDir = path.join(packageDir, 'templates');
    const packageJsonPath = path.join(packageDir, 'package.json');
    if (options.front) {
      initFront(templatesDir, itoolsDir, packageDir, options);
    }
    if (options.back) {
      initBack(templatesDir, itoolsDir, packageDir, options);
    }
    await execute(
      `yarn`,
      [
        'workspace',
        `@${projectConfig.projectName}/${packageName}`,
        'add',
        '-D',
        '@openapitools/openapi-generator-cli',
        'cross-env',
        'prettier',
      ],
      true
    );
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    packageJson.scripts['api-generate-dev'] = 'cross-env JAVA_OPTS="-Dlog.level=info" openapi-generator-cli generate';
    packageJson.scripts['api-generate'] =
      'cross-env TS_POST_PROCESS_FILE="node ./node_modules/prettier/bin/prettier.cjs --write" JAVA_OPTS="-Dlog.level=info" openapi-generator-cli generate';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const tsConfig = merge(JSON.parse(fs.readFileSync(path.join(packageDir, 'tsconfig.json'), 'utf-8')), {
      compilerOptions: {
        paths: {
          '@api': ['src/api'],
          '@api/*': ['src/api/*'],
        },
      },
    });
    fs.writeFileSync(path.join(packageDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
    console.log(chalk.green('Done'));
  });

program.parse();
