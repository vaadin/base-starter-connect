#!/usr/bin/env node
const {execFileSync} = require('child_process');

// Concat with appended env variables
var webpackArgs = ['--mode', 'development', '-w', '--progress'].concat(process.argv.splice(2));
execFileSync('webpack', webpackArgs, {stdio: 'inherit'});
