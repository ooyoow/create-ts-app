/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var paths = require('./paths');

var REACT_APP = /^REACT_APP_/i;
var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
var package = require(paths.appPackageJson);


var env= Object
  .keys(process.env)
  .filter(key => REACT_APP.test(key))
  .reduce((env, key) => {
    env[ key] = JSON.stringify(process.env[key]);
    return env;
  }, {
    'NODE_ENV': NODE_ENV,
    'APP_NAME': `"${package.name}"`,
    'APP_VERSION': `"${package.version}"`,
  });

module.exports = {"process.env":env};
