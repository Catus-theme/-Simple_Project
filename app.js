const express = require('express');
const app = express();
const path = require('path');
const mongo = require('mongodb');
const port = 3000;

app.set('views', __dirname + ('/views'));
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname + '/public')));
app.locals.pretty = true;

app.get('/', ( req, res ) => {
  res.render('reg_board');
});

app.listen( port, () => {
  console.log(` server start ... ${port} port `);
});

