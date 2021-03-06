/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');
var pathExists = require('path-exists');
var chalk = require('chalk');

module.exports = function (appPath, appName, verbose, originalDirectory) {
  var ownPath = path.join(appPath, 'node_modules', 'tsapp-scripts');

  var appPackage = require(path.join(appPath, 'package.json'));
  var ownPackage = require(path.join(ownPath, 'package.json'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = appPackage.devDependencies || {};
  ['react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-thunk', 'redux-helper', 'node-sass',
    'react-addons-css-transition-group', 'react-bootstrap', 'bootstrap','typescript'].forEach(function (key) {
      appPackage.dependencies[key] = ownPackage.devDependencies[key];
    });

  //Copy react-test-renderer and @types dep as dev dep.
  var typesDep = Object.keys(ownPackage.devDependencies).filter(k=>k.indexOf('@types/')>=0);
  ['react-test-renderer'].concat(typesDep).forEach(function (key) {
    appPackage.devDependencies[key] = ownPackage.devDependencies[key];
  });

  // Setup the script rules
  appPackage.scripts = {};
  ['start', 'build', 'eject', 'test'].forEach(function (command) {
    appPackage.scripts[command] = 'tsapp-scripts ' + command;
  });
  appPackage.scripts['test:watch'] = 'npm run -s test & npm run -s test --  --u --watch --onlyChanged';

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  var readmeExists = pathExists.sync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(path.join(appPath, 'README.md'), path.join(appPath, 'README.old.md'));
  }

  // Copy the files for the user
  fs.copySync(path.join(ownPath, 'template'), appPath);

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  fs.move(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'), [], function (err) {
    if (err) {
      // Append if there's already a `.gitignore` file there
      if (err.code === 'EEXIST') {
        var data = fs.readFileSync(path.join(appPath, 'gitignore'));
        fs.appendFileSync(path.join(appPath, '.gitignore'), data);
        fs.unlinkSync(path.join(appPath, 'gitignore'));
      } else {
        throw err;
      }
    }
  });

  // Run another npm install for react and react-dom
  console.log('Installing react and react-dom from npm...');
  console.log();
  // TODO: having to do two npm installs is bad, can we avoid it?
  var args = [
    'install',
    verbose && '--verbose'
  ].filter(function (e) { return e; });
  var proc = spawn('npm', args, { stdio: 'inherit' });
  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm ' + args.join(' ') + '` failed');
      return;
    }

    // Display the most elegant way to cd.
    // This needs to handle an undefined originalDirectory for
    // backward compatibility with old global-cli's.
    var cdpath;
    if (originalDirectory &&
      path.join(originalDirectory, appName) === appPath) {
      cdpath = appName;
    } else {
      cdpath = appPath;
    }

    console.log();
    console.log('Success! Created ' + appName + ' at ' + appPath + '.');
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log('  * npm start: Starts the development server.');
    console.log('  * npm run build: Bundles the app into static files for production.');
    console.log('  * npm run eject: Removes this tool. If you do this, you can’t go back!');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log('  cd', cdpath);
    console.log('  npm start');
    if (readmeExists) {
      console.log();
      console.log(chalk.yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
    }
    console.log();
    console.log('Happy hacking!');
  });
};
