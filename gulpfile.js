const { series, src, dest } = require('gulp');
const fs = require('fs');
const path = require('path');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function clean(cb) {
  fs.rmSync('./bin', {recursive: true});
  cb();
}

function build(cb) {
  const tsResult = src("src/**/*.ts")
    .pipe(tsProject());

  return tsResult.js.pipe(dest('bin'));
}

function copy(cb) {
  src("src/*.js").pipe(dest('bin'));
  src("src/config.json").pipe(dest('bin/config.json'));
  src("src/tsconfig.json").pipe(dest('bin/tsconfig.json'));
  src("src/templates/**/*").pipe(dest('bin/templates'));
  src("src/typescript-fetch-templates/**/*").pipe(dest('bin/typescript-fetch-templates'));
  src("src/typescript-nestjs-templates/**/*").pipe(dest('bin/typescript-nestjs-templates'));
  cb();
}

exports.clean = clean;
exports.default = series(clean, build, copy);
exports.build = series(clean, build, copy);
