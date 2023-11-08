#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const config_json_1 = tslib_1.__importDefault(require("./config.json"));
const yaml_1 = require("yaml");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const execute_helper_1 = require("./execute-helper");
const package_json_generator_1 = require("./package-json-generator");
const commander_1 = require("commander");
const initYarn1 = async (projectDir) => {
    console.log('Initialise Yarn v1');
    await (0, execute_helper_1.execute)('git', ['init']);
    fs_1.default.writeFileSync(path_1.default.join(projectDir, '.gitignore'), `/node_modules
npm-debug.log
yarn-error.log
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*`);
};
const initYarn3 = async (yarnPlugins) => {
    console.log('Initialise Yarn v3');
    await (0, execute_helper_1.execute)('corepack', ['enable']);
    await (0, execute_helper_1.execute)('corepack', ['prepare', 'yarn@stable', '--activate']);
    await (0, execute_helper_1.execute)('yarn', ['init', '-2']);
    await (0, execute_helper_1.execute)('yarn', ['set', 'version', 'stable']);
    const pluginsLength = yarnPlugins.length;
    if (!!pluginsLength) {
        for (let i = 0; i < pluginsLength; i++) {
            await (0, execute_helper_1.execute)('yarn', ['plugin', 'import', yarnPlugins[i]], true);
        }
    }
};
const initInfrastructureDir = (projectDir, infrastructureDirName) => {
    console.log('Initialise infrastructure directory');
    const infrastructureDir = path_1.default.join(projectDir, infrastructureDirName);
    fs_1.default.mkdirSync(infrastructureDir);
    fs_1.default.writeFileSync(path_1.default.join(infrastructureDir, '.gitignore'), 'env/.env.prod');
    const envDir = path_1.default.join(infrastructureDir, 'env');
    fs_1.default.mkdirSync(envDir);
    fs_1.default.writeFileSync(path_1.default.join(envDir, '.env.dev'), 'NODE_ENV=development');
    fs_1.default.writeFileSync(path_1.default.join(envDir, '.env.prod'), 'NODE_ENV=production');
    const composeDir = path_1.default.join(infrastructureDir, 'docker-compose');
    fs_1.default.mkdirSync(composeDir);
    const composeTemplate = { version: '3.9', services: {} };
    fs_1.default.writeFileSync(path_1.default.join(composeDir, 'docker-compose.dev-linux.yaml'), (0, yaml_1.stringify)(composeTemplate));
    fs_1.default.writeFileSync(path_1.default.join(composeDir, 'docker-compose.dev-windows.yaml'), (0, yaml_1.stringify)(composeTemplate));
    fs_1.default.writeFileSync(path_1.default.join(composeDir, 'docker-compose.prod-linux.yaml'), (0, yaml_1.stringify)(composeTemplate));
};
const createPackagesDirs = (projectDir, packagesDirs) => {
    console.log('Create packages directories');
    packagesDirs.forEach((item) => fs_1.default.mkdirSync(path_1.default.join(projectDir, item)));
};
const createProjectConfig = (projectDir, params) => {
    fs_1.default.writeFileSync(path_1.default.join(projectDir, 'proj.json'), JSON.stringify({
        projectName: params.name,
        packageDirs: params.packagesDirs,
        infrastructureDir: params.infrastructureDir,
        isYarn1: params.yarn1,
        repo: params.repo,
    }, null, 2));
};
const initGit = async (repo) => {
    await (0, execute_helper_1.execute)('git', ['add', '.']);
    await (0, execute_helper_1.execute)('git', ['commit', '-m', '"start"']);
    if (repo) {
        await (0, execute_helper_1.execute)('git', ['remote', 'add', 'origin', '${repo}']);
        await (0, execute_helper_1.execute)('git', ['push', '--set-upstream', 'origin', 'master']);
    }
};
const createProjectDir = (projectDir, force) => {
    if (force) {
        fs_1.default.rmSync(projectDir, { recursive: true, force: true });
    }
    fs_1.default.mkdirSync(projectDir);
};
const createReamMe = (projectDir, params) => {
    fs_1.default.writeFileSync(path_1.default.join(projectDir, 'README.md'), params.name);
};
async function main(params) {
    const projectDir = path_1.default.join(process.cwd(), params.name);
    createProjectDir(projectDir, params.force);
    console.log('Go to project dir: ', projectDir);
    process.chdir(projectDir);
    initInfrastructureDir(projectDir, params.infrastructureDir);
    createPackagesDirs(projectDir, params.packagesDirs);
    createReamMe(projectDir, params);
    createProjectConfig(projectDir, params);
    if (params.yarn1) {
        await initYarn1(projectDir);
    }
    else {
        await initYarn3(params.yarnPlugins);
    }
    const templatesDir = path_1.default.resolve(path_1.default.join(__dirname, '..', 'templates'));
    (0, package_json_generator_1.createPackageJson)(templatesDir, projectDir, true, params);
    await (0, execute_helper_1.execute)('yarn', ['install'], true);
    await initGit(params.repo);
}
const program = new commander_1.Command();
program
    .name('create-app')
    .description('Cli to initialize project with yarn workspaces')
    .version('0.0.1')
    .requiredOption('-n, --name <name>', 'Project and directory name', config_json_1.default.defaultProjectName)
    .option('-p, --packages-dirs <packages-dirs...>', 'Packages directories names for logic segregation', config_json_1.default.packagesDirs)
    .option('-i, --infrastructure-dir <infrastructure-dir>', 'infrastructure directory path', config_json_1.default.infrastructureDir)
    .option('-d, --description <description>', 'Project description', '')
    .option('-a, --author <author>', 'Project author', '')
    .option('-r, --repo <repo>', 'Project repository address')
    .addOption(new commander_1.Option('--yarn-plugins <yarn-plugins...>', 'Yarn 3 plugins list').default(config_json_1.default.yarnPlugins).conflicts('yarn1'))
    .option('-f, --force', 'Force recreate')
    .option('--yarn1', 'Initialize yarn 1 project')
    .parse();
main(program.opts()).then(() => {
    console.log(chalk_1.default.green('Done'));
}).catch((error) => {
    console.error(chalk_1.default.red(error));
});
