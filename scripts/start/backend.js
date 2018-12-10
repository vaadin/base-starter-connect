#!/usr/bin/env node
/**
 * Starts the backend server and executes the optional chained command while
 * the backend server is running.
 *
 * Usage:
 *   $ node scripts/start/backend.js
 *   $ node scripts/start/backend.js -- echo "The backend is running..."
 */

const {spawn} = require('child_process');
const fs = require('fs');

const hasFilesWithExtension = (directory, extension) => {
  return fs.existsSync(directory)
    && fs.readdirSync(directory).find(path => path.endsWith(extension));
};

const endOfOptionsIndex = process.argv.indexOf('--');
const [chainedExecutable, ...chainedArgs] = endOfOptionsIndex > -1
  ? process.argv.slice(endOfOptionsIndex + 1)
  : [];

const tryStartWatcher = () => {
  spawn('./mvnw -e', ['fizzed-watcher:run'], {stdio: 'inherit', shell: true})
    .on('exit', code => {
      if (code !== 0) {
        console.error('Failed to start the Java file watcher');
        process.exit(code);
      }
    });
};

tryStartWatcher();
if (chainedExecutable) {
  spawn(
    './mvnw -e',
    [
      hasFilesWithExtension('./target', '.jar') ? 'generate-resources' : 'package -DskipTests',
      'spring-boot:start',
      '-Dspring-boot.run.fork',
      'exec:exec',
      `-Dexec.executable="${chainedExecutable}"`,
      `-Dexec.args="${chainedArgs.join(' ')}"`
    ],
    {stdio: 'inherit', shell: true}
  ).on('exit', code => process.exit(code));
} else {
  spawn('./mvnw -e', ['spring-boot:run'], {stdio: 'inherit', shell: true})
    .on('exit', code => process.exit(code));
}
