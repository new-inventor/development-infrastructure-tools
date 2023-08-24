const {execSync} = require("node:child_process");
const spawn = require('cross-spawn');


const execute = (command, params, printCommand = false) => {
  console.log('run: ', `${command} ${params ? params.join(' ') : ''}`);
  return new Promise((resolve, reject) => {
    const runner = spawn(command, params);
    runner.stdout.on('data', output => {
      // the output data is captured and printed in the callback
      if (printCommand) {
        console.log("Output: ", output.toString())
      }
    });
    runner.on('close', (code) => {
      console.log('Exit code: ', code);
      resolve(code);
    });
    runner.on('error', (error) => {
      console.log(error);
      reject(error);
    })
  });
}

const getCommandRes = (command, printCommand = false) => {
  try {
    if (printCommand) {
      console.log('run: ', command);
    }
    const res = execSync(command);
    return res.toString();
  } catch (e) {
    console.log('Error', e.output.toString());
  }
}

module.exports = {
  execute,
  getCommandRes,
}
