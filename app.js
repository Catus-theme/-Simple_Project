const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const app = express();
const mongo = require('mongodb');
// client server port 
const port = 3000;
// Connect URL
const url = 'mogobd://localhost:27017';
// Database Name
const dbName = 'board';

// Use connect method to connect to the server
// MongoClient.connect(url,(err,client) => {
//   // assert.equal(null,err);
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   console.log('db :', db);
//   client.close();
// })

app.set('views', __dirname + ('/views'));
app.set('view engine', 'pug');
app.use('/public', express.static(__dirname + '/public'));
app.locals.pretty = true;

app.get('/', ( req, res ) => {
  res.render('index');
});

app.listen( port, () => {
  console.log(` server start ... ${port} port `);
});

