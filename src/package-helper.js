#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command, Option, Argument } = require('commander');
const { execute } = require('./execute-helper');
const { createPackageJson } = require('./package-json-generator');
const chalk = require('chalk');
const { merge } = require('lodash');

const program = new Command();
const runDir = process.cwd();
const projectConfig = JSON.parse(fs.readFileSync(path.join(runDir, 'proj.json')).toString());
const packagesDirs = projectConfig.packageDirs.reduce((acc, item) => ({ ...acc, [item]: path.join(runDir, item) }), {});

program.name('package-helper').description('Cli to help work with yarn workspaces packages').version('0.0.1');

const esLintConfig = {
  root: true,
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'class-methods-use-this': 'warn',
    'jsx-a11y/label-has-associated-control': 1,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.spec.js',
          '**/*.spec.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/setupTests.ts',
        ],
      },
    ],
    'padded-blocks': [2, 'never'],
    'no-plusplus': 0,
    indent: 0,
    'object-property-newline': 0,
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'brace-style': [2, '1tbs'],
    'key-spacing': [
      2,
      {
        mode: 'strict',
        beforeColon: false,
        afterColon: true,
      },
    ],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'implicit-arrow-linebreak': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        json: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'max-len': [
      2,
      {
        code: 220,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    'no-console': 0,
    'no-debugger': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    'no-bitwise': [2, { allow: ['>>=', '&'] }],
    'sort-keys': 0,
    'object-curly-newline': 0,
    'lines-between-class-members': 'off',
    'no-nested-ternary': 1,
  },
  settings: {
    'import/extensions': ['.js', '.json'],
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};

const prettierConfig = {
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 4,
  printWidth: 120,
};

const lintStagedConfig = {
  'src/**/*.{tsx,ts,js,json,yaml,yml}': ['eslint --fix', 'prettier -w -u'],
};

const eslintTsConfig = {
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        enums: 'always-multiline',
        generics: 'never',
        tuples: 'never',
      },
    ],
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-unsafe-call': 1,
    '@typescript-eslint/no-unsafe-return': 1,
    '@typescript-eslint/no-unsafe-argument': 1,
    '@typescript-eslint/restrict-template-expressions': 1,
  },
  settings: {
    'import/extensions': ['.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};

const eslintReactConfig = {
  plugins: ['react'],
  rules: {
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 1,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/prop-types': 0,
    'react/no-array-index-key': 2,
    'react/react-in-jsx-scope': 2,
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true,
      },
    ],
    'react/style-prop-object': [1],
    'react/jsx-boolean-value': [1, 'never'],
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-spacing': [
      2,
      'never',
      {
        allowMultiline: true,
      },
    ],
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
    'react/jsx-fragments': [2, 'syntax'],
    'react/jsx-handler-names': 0,
    'react/jsx-indent': [
      1,
      1,
      {
        checkAttributes: false,
        indentLogicalExpressions: true,
      },
    ],
    'react/jsx-key': [
      2,
      {
        checkFragmentShorthand: true,
      },
    ],
    'react/jsx-max-depth': [1, { max: 8 }],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'react/jsx-no-bind': [
      1,
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'react/jsx-no-duplicate-props': [2, { ignoreCase: true }],
    'react/jsx-no-literals': 0,
    'react/jsx-no-script-url': 2,
    'react/jsx-no-target-blank': [
      1,
      {
        allowReferrer: false,
        enforceDynamicLinks: 'always',
      },
    ],
    'react/jsx-no-useless-fragment': 2,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-pascal-case': [2, { allowAllCaps: false }],
    'react/jsx-props-no-multi-spaces': 2,
    'react/jsx-sort-props': [
      1,
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    'react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/jsx-uses-vars': 1,
    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore',
      },
    ],
    'react/function-component-definition': [
      1,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: ['arrow-function', 'function-expression'],
      },
    ],
    'react/require-default-props': 0,
  },
  settings: {
    'import/extensions': ['.tsx', '.jsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.tsx', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.tsx'],
      },
    },
  },
};

const addItemsUnique = (...arrays) => Array.from(new Set([...arrays.flat()]));

program
  .command('create')
  .description('Create package in specified directory')
  .addArgument(new Argument('<root-dir>', 'Directory to create package in').choices(Object.keys(packagesDirs)))
  .argument('<name>', 'Name of the package')
  .option('-d, --description <description>', 'Package description', '')
  .option('-a, --author <author>', 'Package author', '')
  .action(async (packageRootDir, packageName, options) => {
    const packageDir = path.join(runDir, packageRootDir, packageName);
    const templatesDir = path.resolve(path.join(__dirname, 'templates', 'generator_templates'));
    fs.mkdirSync(packageDir);
    fs.cpSync(path.join(templatesDir, '.gitignore.template'), path.join(packageDir, '.gitignore'));
    fs.cpSync(path.join(templatesDir, '.dockerignore.template'), path.join(packageDir, '.dockerignore'));
    fs.cpSync(path.join(templatesDir, 'Dockerfile.template'), path.join(packageDir, '.Dockerfile'));
    fs.writeFileSync(path.join(packageDir, 'README.md'), `# ${packageName}`);
    fs.writeFileSync(path.join(packageDir, '.eslintrc'), JSON.stringify(esLintConfig, null, 2));
    fs.writeFileSync(path.join(packageDir, '.prettierrc'), JSON.stringify(prettierConfig, null, 2));
    fs.writeFileSync(path.join(packageDir, '.lintstagedrc.json'), JSON.stringify(lintStagedConfig, null, 2));
    createPackageJson(
      {
        scripts: {
          start: '',
          build: '',
          'build:local': '',
          clean: 'rimraf ./dist',
          format: 'prettier --write "src/**/*.{tsx,ts,js,json,yaml,yml}"',
          lint: 'eslint "src/**/*.{tsx,ts,js,json,yaml,yml}" --fix',
        },
      },
      packageDir,
      false,
      {
        name: `@${projectConfig.projectName}/${packageName}`,
        author: options.author,
        description: options.description,
        yarn1: projectConfig.isYarn1,
      }
    );
    await execute(
      `yarn`,
      [
        'workspace',
        `@${projectConfig.projectName}/${packageName}`,
        'add',
        '-D',
        'lint-staged',
        'rimraf',
        'prettier',
        'eslint',
        'dotenv',
        'dotenv-cli',
        'eslint-config-airbnb',
        'eslint-config-prettier',
        'eslint-plugin-import',
        'eslint-plugin-prettier',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
      ],
      true
    );
    fs.mkdirSync(path.join(runDir, packageRootDir, packageName, 'src'));
    console.log(chalk.green('Done'));
  });
program
  .command('delete')
  .description('Delete package from project')
  .argument('<package-name>', 'Package name to run action on')
  .action(async (packageName) => {
    const len = projectConfig.packageDirs.length || 0;
    for (let i = 0; i < len; i++) {
      const rootDir = path.join(runDir, projectConfig.packageDirs[i]);
      const hasPackage = fs
        .readdirSync(rootDir, { withFileTypes: true })
        .find((dirent) => dirent.isDirectory() && dirent.name === packageName);
      if (hasPackage) {
        fs.rmSync(path.join(rootDir, packageName), { recursive: true, force: true });
        console.log(chalk.green('Done'));
        return;
      }
    }
    throw new Error(
      `Package "${packageName}" not found in packages directories: "${projectConfig.packageDirs.join('", "')}"`
    );
  });
program
  .command('run')
  .description('Start package command')
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
  .addOption(
    new Option('-o, --optional-dependencies <optional-dependencies...>', 'Package optional dependencies list').default(
      []
    )
  )
  .action(async (packageName, options) => {
    try {
      if (options.dependencies.length > 0) {
        await execute(
          `yarn`,
          ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', ...options.dependencies],
          true
        );
        console.log(chalk.green('Dependencies installed'));
      }
      if (options.devDependencies.length > 0) {
        await execute(
          `yarn`,
          ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', '-D', ...options.devDependencies],
          true
        );
        console.log(chalk.green('Dev dependencies installed'));
      }
      if (options.peerDependencies.length > 0) {
        await execute(
          `yarn`,
          ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', '-P', ...options.peerDependencies],
          true
        );
        console.log(chalk.green('Peer dependencies installed'));
      }
      if (options.optionalDependencies.length > 0) {
        await execute(
          `yarn`,
          ['workspace', `@${projectConfig.projectName}/${packageName}`, 'add', '-O', ...options.optionalDependencies],
          true
        );
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
    if (dependencies.length > 0) {
      return execute(
        `yarn`,
        ['workspace', `@${projectConfig.projectName}/${packageName}`, 'remove', ...dependencies],
        true
      )
        .then(() => console.log(chalk.green('Done')))
        .catch((error) => console.error(chalk.red(error)));
    }
  });
program
  .command('add-react')
  .description('Add react to package')
  .addArgument(new Argument('<root-dir>', 'Directory to create package in').choices(Object.keys(packagesDirs)))
  .argument('<package-name>', 'Package name')
  .action(async (packageRootDir, packageName) => {
    await execute(
      `yarn`,
      [
        'workspace',
        `@${projectConfig.projectName}/${packageName}`,
        'add',
        'react',
        'react-dom',
        'core-js',
        'regenerator-runtime',
      ],
      true
    );
    await execute(
      `yarn`,
      [
        'workspace',
        `@${projectConfig.projectName}/${packageName}`,
        'add',
        '-D',
        '@babel/cli',
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
        '@types/babel__core',
        '@types/react',
        '@types/react-dom',
        'autoprefixer',
        'babel-loader',
        'clean-webpack-plugin',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'html-webpack-plugin',
        'postcss',
        'postcss-loader',
        'postcss-preset-env',
        'terser-webpack-plugin',
        'webpack',
        'webpack-bundle-analyzer',
        'webpack-cli',
        'webpack-dev-server',
      ],
      true
    );

    const packageDir = path.join(runDir, packageRootDir, packageName);
    const packageJsonConfig = merge(JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf-8')), {
      scripts: {
        start: 'dotenv -e ../../infrastructure/env/.env.dev -- webpack serve --mode development',
        build: 'webpack --mode production --stats-children',
        'build:local': 'dotenv -e ../../infrastructure/env/.env.prod -- webpack --mode production --stats-children',
      },
    });
    fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(packageJsonConfig, null, 2));

    fs.writeFileSync(
      path.join(packageDir, '.babelrc'),
      JSON.stringify(
        {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        },
        null,
        2
      )
    );

    fs.writeFileSync(
      path.join(packageDir, 'postcss.config.js'),
      `module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')
  ]
};`
    );

    const { plugins, settings, ...config } = eslintReactConfig;
    const eslintConfig = merge(JSON.parse(fs.readFileSync(path.join(packageDir, '.eslintrc'), 'utf-8')), config);
    eslintConfig['plugins'] = addItemsUnique(eslintConfig['plugins'], plugins);
    eslintConfig['settings']['import/extensions'] = addItemsUnique(
      eslintConfig['settings']['import/extensions'],
      settings['import/extensions']
    );
    eslintConfig['settings']['import/extensions'] = addItemsUnique(
      eslintConfig['settings']['import/extensions'],
      settings['import/extensions']
    );
    eslintConfig['settings']['import/resolver'].node.extensions = addItemsUnique(
      eslintConfig['settings']['import/resolver'].node.extensions,
      settings['import/resolver'].node.extensions
    );
    eslintConfig['settings']['import/parsers'] = addItemsUnique(
      eslintConfig['settings']['import/parsers'],
      settings['import/parsers']
    );
    fs.writeFileSync(path.join(packageDir, '.eslintrc'), JSON.stringify(eslintConfig, null, 2));

    const { lib, ...tsDeltaConfig } = {
      jsx: 'react',
      lib: ['es2015', 'es2017', 'dom'],
      paths: {
        '@api': ['src/api'],
        '@api/*': ['src/api/*'],
      },
    };
    const tsConfig = merge(JSON.parse(fs.readFileSync(path.join(packageDir, 'tsconfig.json'), 'utf-8')), {
      compilerOptions: tsDeltaConfig,
    });
    tsConfig.compilerOptions['lib'] = addItemsUnique(tsConfig.compilerOptions['lib'], lib);
    fs.writeFileSync(path.join(packageDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

    const publicPath = path.join(packageDir, 'public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath);
    }
    fs.writeFileSync(
      path.join(publicPath, 'index.html'),
      `<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='utf-8' />
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">
</div>
</body>
</html>`
    );

    fs.writeFileSync(
      path.join(publicPath, 'robots.txt'),
      `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow: /
`
    );

    fs.writeFileSync(
      path.join(packageDir, 'src', 'index.tsx'),
      `import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);`
    );
    fs.writeFileSync(
      path.join(packageDir, 'src', 'app.tsx'),
      `import React from 'react';

export const App = () => {
  return (
    <div>
    App
    </div>
  );
};
`
    );

    fs.writeFileSync(
      path.join(packageDir, 'webpack.config.js'),
      `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = function (env, argv) {
    const isEnvProduction = argv.mode === 'production';
    const isEnvDevelopment = argv.mode === 'development';

    return {
        entry: {
            main: './src/index.tsx'
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@app': path.resolve(__dirname, 'src/'),
                '@api': path.resolve(__dirname, 'src/api/')
            }
        },
        output: {
            path: path.join(__dirname, './dist'),
            publicPath: \`/\`,
            scriptType: 'text/javascript',
            assetModuleFilename: 'images/[hash][ext][query]'
        },
        devServer: {
            static: './dist',
            port: 8080,
            historyApiFallback: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            },
            hot: false,
            client: {
                logging: 'log',
                overlay: {
                    warnings: true,
                    errors: true
                }
            },
        },
        module: {
            rules: [
                {
                    test: /\\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\\.(png|jpe?g|gif|svg)$/i,
                    generator: {
                        publicPath: \`./\`
                    },
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({'process.env': JSON.stringify(process.env)}),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: true,
                hash: true,
                xhtml: true,
                meta: {
                    viewport: 'width=device-width,initial-scale=1,shrink-to-fit=no'
                },
                // favicon: './public/favicon.ico',
                title: '${packageName}',
                collapseWhitespace: false,
                template: './public/index.html',
                publicPath: \`./\`,
                ...(isEnvProduction
                    ? {
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true
                        }
                    }
                    : undefined)
            }),
            ...(isEnvDevelopment
                ? [new BundleAnalyzerPlugin({analyzerPort: 8889, openAnalyzer: false})]
                : [])
        ],
        devtool: isEnvDevelopment ? 'source-map' : false,
        cache: isEnvDevelopment,
        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {output: {ascii_only: true}}
                })
            ]
        }
    };
};`
    );
  });
program
  .command('add-ts')
  .description('Add TypeScript base configs and packages')
  .addArgument(new Argument('<root-dir>', 'Directory to create package in').choices(Object.keys(packagesDirs)))
  .argument('<package-name>', 'Package name')
  .addOption(
    new Option('-m --module <module>', 'Module type for generation')
      .default('esnext')
      .choices([
        'commonjs',
        'amd',
        'umd',
        'system',
        'es6',
        'es2015',
        'es2020',
        'es2022',
        'esnext',
        'node16',
        'nodenext',
      ])
  )
  .addOption(
    new Option('-t --target <target>', 'Transpilation target')
      .default('esnext')
      .choices([
        'es3',
        'es5',
        'es6',
        'es2015',
        'es2016',
        'es2017',
        'es2018',
        'es2019',
        'es2020',
        'es2021',
        'es2022',
        'esnext',
      ])
  )
  .addOption(
    new Option('-l --libs <libs...>', 'Included type definitions')
      .default(['ESNext'])
      .choices([
        'ES5',
        'ES2015',
        'ES6',
        'ES2016',
        'ES7',
        'ES2017',
        'ES2018',
        'ES2019',
        'ES2020',
        'ES2021',
        'ES2022',
        'ESNext',
        'DOM',
        'WebWorker',
        'ScriptHost',
        'DOM.Iterable',
        'ES2015.Core',
        'ES2015.Collection',
        'ES2015.Generator',
        'ES2015.Iterable',
        'ES2015.Promise',
        'ES2015.Proxy',
        'ES2015.Reflect',
        'ES2015.Symbol',
        'ES2015.Symbol.WellKnown',
        'ES2016.Array.Include',
        'ES2017.object',
        'ES2017.Intl',
        'ES2017.SharedMemory',
        'ES2017.String',
        'ES2017.TypedArrays',
        'ES2018.Intl',
        'ES2018.Promise',
        'ES2018.RegExp',
        'ES2019.Array',
        'ES2019.Object',
        'ES2019.String',
        'ES2019.Symbol',
        'ES2020.String',
        'ES2020.Symbol.wellknown',
        'ES2021.Promise',
        'ES2021.String',
        'ES2021.WeakRef',
        'ESNext.AsyncIterable',
        'ESNext.Array',
        'ESNext.Intl',
        'ESNext.Symbol',
      ])
  )
  .addOption(
    new Option('-r --module-resolution <moduleRsolution>', 'Module resolutionStrategy')
      .default('classic')
      .choices(['classic', 'node10', 'node', 'node16', 'nodenext', 'bundler'])
  )
  .action(async (packageRootDir, packageName, options) => {
    const tsConfig = {
      compilerOptions: {
        outDir: './dist',
        sourceMap: true,
        noImplicitAny: true,
        module: options.module,
        target: options.target,
        strict: true,
        lib: options.libs,
        removeComments: true,
        moduleResolution: options.moduleResolution,
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,
        allowJs: true,
        baseUrl: '.',
        paths: {
          '@app': ['src/'],
          '@app/*': ['src/*'],
        },
        allowUnreachableCode: false,
        allowUnusedLabels: false,
      },
    };
    const packageDir = path.join(runDir, packageRootDir, packageName);
    fs.writeFileSync(path.join(packageDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
    await execute(
      `yarn`,
      [
        'workspace',
        `@${projectConfig.projectName}/${packageName}`,
        'add',
        '-D',
        'typescript',
        '@types/node',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-config-airbnb-typescript',
      ],
      true
    );
    const { extends: ext, plugins, settings, ...conf } = eslintTsConfig;
    const eslintConfig = merge(JSON.parse(fs.readFileSync(path.join(packageDir, '.eslintrc'), 'utf-8')), conf);

    eslintConfig['extends'] = addItemsUnique(eslintConfig['extends'], ext);
    eslintConfig['plugins'] = addItemsUnique(eslintConfig['plugins'], plugins);
    eslintConfig['settings']['import/extensions'] = addItemsUnique(
      eslintConfig['settings']['import/extensions'],
      settings['import/extensions']
    );
    eslintConfig['settings']['import/resolver'].node.extensions = addItemsUnique(
      eslintConfig['settings']['import/resolver'].node.extensions,
      settings['import/resolver'].node.extensions
    );
    eslintConfig['settings']['import/parsers'] = addItemsUnique(
      eslintConfig['settings']['import/parsers'] || [],
      settings['import/parsers']
    );
    fs.writeFileSync(path.join(packageDir, '.eslintrc'), JSON.stringify(eslintConfig, null, 2));

    console.log(chalk.green('Done'));
  });

program.parse();
