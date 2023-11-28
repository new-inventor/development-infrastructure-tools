const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = function (env, argv) {
    const isEnvProduction = argv.mode === 'production';
    const isEnvDevelopment = argv.mode === 'development';

    return {
        entry: {
            create_app: './src/create-app.ts',
            docker: './src/docker-decorator.js',
            package: './src/package-helper.js',
        },
        target: 'node',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            path: path.join(__dirname, './bin'),
            // publicPath: `/`,
            scriptType: 'text/javascript',
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ShebangPlugin(),
            new CopyPlugin({
              patterns: [
                { from: "./src/config.json", to: "." },
                { from: "./src/templates", to: "./templates" },
                { from: "./src/typescript-fetch-templates", to: "./typescript-fetch-templates" },
                { from: "./src/typescript-nestjs-templates", to: "./typescript-nestjs-templates" },
              ],
            }),
        ],
        devtool: false,
        cache: isEnvDevelopment,
        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {output: {ascii_only: true, comments: false}}
                })
            ]
        }
    };
};
