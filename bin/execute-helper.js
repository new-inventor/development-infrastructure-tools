"use strict";
const { execSync } = require("node:child_process");
const spawn = require('cross-spawn');
const chalk = require('chalk');
const execute = (command, params, printCommand = false) => {
    console.log('run: ', `${command} ${params ? params.join(' ') : ''}`);
    return new Promise((resolve, reject) => {
        const runner = spawn(command, params);
        runner.stdout.on('data', output => {
            if (printCommand) {
                process.stdout.write(`Output: ${output.toString()}`);
            }
        });
        runner.on('close', (code) => {
            console.log('Exit code: ', code);
            resolve(code);
        });
        runner.on('error', (error) => {
            console.error(chalk.red(error));
            reject(error);
        });
    });
};
const getCommandRes = (command, printCommand = false) => {
    try {
        if (printCommand) {
            console.log('run: ', command);
        }
        const res = execSync(command);
        return res.toString();
    }
    catch (e) {
        console.error('Error', e.output.toString());
    }
};
module.exports = {
    execute,
    getCommandRes,
};
