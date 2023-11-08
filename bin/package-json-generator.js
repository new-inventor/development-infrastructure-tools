"use strict";
const path = require("path");
const fs = require("fs");
const { getCommandRes } = require("./execute-helper");
const createPackageJson = (templatesDir, packageDir, isRoot, params) => {
    const packageJsonDefaultsFile = path.join(templatesDir, 'package.json');
    const packageConf = JSON.parse(fs.readFileSync(packageJsonDefaultsFile).toString());
    packageConf.name = params.name;
    packageConf.description = params.description;
    packageConf.author = params.author;
    if (isRoot) {
        packageConf.workspaces = params.packagesDirs.reduce((acc, item) => [...acc, `${item}/*`], []);
    }
    const yarnVersion = getCommandRes('yarn -v').trim();
    packageConf.packageManager = `yarn@${yarnVersion}`;
    if (!packageConf.engines) {
        packageConf.engines = {};
    }
    if (params.yarn1) {
        packageConf.engines.yarn = '^1.22';
    }
    else {
        packageConf.engines.yarn = '^3.5';
    }
    fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(packageConf, null, 2));
};
module.exports = {
    createPackageJson,
};
