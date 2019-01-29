#!/usr/bin/env node
/**
 * Starts the backend server and executes the optional chained command while
 * the backend server is running.
 *
 * Usage:
 *   $ node scripts/start/backend.js
 *   $ node scripts/start/backend.js -- echo "The backend is running..."
 */
const {spawn, execFileSync} = require('child_process');
const url = "http://localhost:8080/";

const exec = (cmd, args, options = {}) => {
  options = Object.assign({stdio: 'inherit'}, options);
  if (options.async) {
    return new Promise((resolve, reject) => {
      const childProcess = spawn(cmd, args, options);
      // Ensure the child process is killed on shutdown
      const killer = () => childProcess.kill();
      process.addListener('exit', killer);
      childProcess.on('exit', code => {
        process.removeListener('exit', killer);
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
        }
      });
    });
  } else {
    return execFileSync(cmd, args, options);
  }
};

const execMaven = (args, options) => exec('mvn', ['-e', ...args], options);

// Graceful shutdown
process.on('SIGINT', () => process.exit(0));
process.on('SIGBREAK', () => process.exit(0));
process.on('SIGHUP', () => process.exit(129));
process.on('SIGTERM', () => process.exit(137));

// Server
const endOfOptionsIndex = process.argv.indexOf('--');
const [chainedExecutable, ...chainedArgs] = endOfOptionsIndex > -1
  ? process.argv.slice(endOfOptionsIndex + 1)
  : [];
execMaven(['compile', 'spring-boot:start', '-Dspring-boot.run.fork'], {async: true})
  .then(() => {
    console.log();

    // Java watcher
    if (process.argv.indexOf('--nowatch') < 0) {
      execMaven(['-q', 'fizzed-watcher:run'], {async: true})
        .catch(process.exit);
        console.log(` 🌀  \x1b[36mVaadin Connect\x1b[0m is watching for Java changes on ./src/main/java`);
      }

    console.log(` 🌀  \x1b[36mVaadin Connect\x1b[0m Backend is running at: ${url}`);

    // Pass backend URL to API browser and webpack
    process.env.BACKEND = url;

    if (chainedExecutable) {
      return exec(chainedExecutable, chainedArgs, {async: true})
        .then(process.exit);
    }
  })
  .catch(process.exit);
