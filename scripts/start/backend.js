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
      process.addListener('exit', childProcess.kill, {once: true});
      childProcess.on('exit', code => {
        if (code === 0) {
          resolve({code});
        } else {
          reject({code});
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      try {
        execFileSync(cmd, args, options);
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  }
};

const execMaven = (args, options) => exec('mvn', ['-e', ...args], options);

// Graceful shutdown
process.on('SIGINT', () => process.exit(0));
process.on('SIGBREAK', () => process.exit(0));
process.on('SIGHUP', () => process.exit(129));
process.on('SIGTERM', () => process.exit(137));

execMaven(['-q', 'compile', 'spring-boot:start', '-Dspring-boot.run.fork'], )
  .catch(() => {
    console.log('\n🚫 \x1b[36mVaadin Connect\x1b[0m \x1b[31;1mUnable to start the backend. Check whether another instance is already running \x1b[0m 🚫\n');
  })
  .then(() => {

    // At this point spring-boot has successfully started as a daemon
    // We need to assure that we do not leave it running on exit.
    process.addListener('exit', () => {
      execMaven(['-q', 'spring-boot:stop'], {stdio: 'ignore', async: true});
    }, {once: true});

    // Pass backend URL to other processes
    process.env.BACKEND = url;

    // Run the Java watcher
    if (process.argv.indexOf('--nowatch') < 0) {
      execMaven(['-q', 'fizzed-watcher:run'], {async: true})
        .catch(process.exit);
        console.log(` 🌀  \x1b[36mVaadin Connect\x1b[0m is watching for Java changes on ./src/main/java`);
      }

    console.log(` 🌀  \x1b[36mVaadin Connect\x1b[0m Backend is running at: ${url}`);

    // Run other processes passed through the arguments line
    const endOfOptionsIndex = process.argv.indexOf('--');
    const [chainedExecutable, ...chainedArgs] = endOfOptionsIndex > -1
      ? process.argv.slice(endOfOptionsIndex + 1)
      : [];

    if (chainedExecutable) {
      return exec(chainedExecutable, chainedArgs, {async: true})
        .then(process.exit);
    }
  });
