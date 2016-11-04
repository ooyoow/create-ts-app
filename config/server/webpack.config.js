/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./server.js",
  output: {
    path: './build',
    filename: 'index.js',
  },
  resolve: {
    // These are the reasonable defaults supported by the Node ecosystem.
    extensions: ['', '.js', '.json']

  },
    node: {
      net: 'empty',
      tls: 'empty',
      fs: 'empty'
    },
  module: {
    loaders: [
        { test: /\.json$/, loader: "json" },
    ]
  },
  plugins: [

  ]
};
