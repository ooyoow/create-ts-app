'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const port = process.env.port || 3000;
const log = process.env.NODE_ENV == 'development' ? console.log : () => { };

app.use(cors());
app.options('*', cors());

// serve static assets normally
app.use(express.static(__dirname))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, function () {
  console.log(`Server listening on port:${port}`);
});

// Write env variables to config.js
const envs = Object.keys(process.env)
  .filter(k => k.match('^REACT_APP'))
  .reduce((p, c) => { p += 'var ' + c + '="' + process.env[c] + '";\n'; return p; }, "");
fs.writeFile(path.resolve(__dirname, 'config.js'), envs, () => {
  console.log('config.js created');
  console.log(envs);
});
