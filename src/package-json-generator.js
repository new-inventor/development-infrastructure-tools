const path = require('path');
const fs = require('fs');
const { getCommandRes } = require('./execute-helper');
const { merge } = require('lodash');

const packageJsonConfig = {
  version: '0.0.1',
  private: true,
  license: 'MIT',
  engines: {
    node: '^18.12',
    yarn: '^4',
  },
};

const createPackageJson = (defaultParams, packageDir, isRoot, params) => {
  const packageConf = merge(packageJsonConfig, defaultParams);
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
  } else {
    packageConf.engines.yarn = '^4';
  }
  fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(packageConf, null, 2));
};

module.exports = {
  createPackageJson,
};
