const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const assert = require('assert');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const mongo = require('mongodb');
// client server port 
const port = 3000;
// Connect URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'board';

app.set('views', __dirname + ('/views'));
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname + '/public')));
app.locals.pretty = true;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// main page
app.get('/', (req, res) => {
  res.render('index');
})
// board list page , board detail page
app.get(['/board','/board/detail/:id'], (req, res) => {
  MongoClient.connect(url,(err,client)=>{
    const db = client.db(dbName);
    const collection = db.collection('board');
    // Show board detail content
    if(req.params.id) {
      collection.findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
        if (err) throw err;
        client.close();
        res.render('detail' , {board: result});
      });
    }
    // Show board list 
    else {
      collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        client.close();
        res.render('list' , {list: result});
      });
    }
  });
})
// Add board list
app.get('/board/add', (req, res) => {
  res.render('add');
});
app.post('/board', (req, res) => {
  MongoClient.connect(url,(err,client) => {
    const db = client.db(dbName);
    const collection = db.collection('board');
    const result = req.body;
    result.date = new Date().getTime();
    collection.insertOne(result,(err, result)=> {
      if (err) throw err;
      client.close();
      res.redirect('/board');
    })
  })
})
// Update board list
app.get('/board/modify/:id', (req, res) => {
  MongoClient.connect(url,(err,client) => {
    const db = client.db(dbName);
    const collection = db.collection('board');
    collection.findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
      if (err) throw err;
      client.close();
      res.render('add' , {board: result});
    });
  })
})
app.post('/update/:id', (req, res) => {
  MongoClient.connect(url,(err,client) => {
    const db = client.db(dbName);
    const collection = db.collection('board');
    const result = req.body;
    result.date = new Date().getTime();
    collection.findOneAndUpdate({_id: new ObjectId(req.params.id)}, result, function (err, result) {
        console.log(result);
        if (err) throw err;
        client.close();
        res.redirect('/board');
    })
  })
})
// Delete board list
app.get('/board/del/:id', (req, res) => {
  MongoClient.connect(url,(err,client) => {
    console.log(req.params.id);
    const db = client.db(dbName);
    const collection = db.collection('board');
    collection.deleteOne({_id: new ObjectId(req.params.id)}, function(err, result) {
      console.log(result);
      if (err) throw err;
      client.close();
      res.redirect('/board');
    })
  })
})
app.listen( port, () => { 
  console.log(` server start ... ${port} port `);
});