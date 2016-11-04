'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const port = process.env.port || 3000;
const log = process.env.NODE_ENV=='development' ? console.log : ()=>{};

app.use(cors());
app.options('*', cors());

app.get('/api/config/:key', function(req,res) {
  res.send(process.env[req.params.key]);
});

// serve static assets normally
app.use(express.static(__dirname))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, function () {
  console.log(`Server listening on port:${port}`);
});