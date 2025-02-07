const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
require('dotenv').config();
const bookData = require('./public/js/viewdata')
const cookieParser = require('cookie-parser');
const router = require("./router/router")
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app
});

app.use(router)
app.get('/list', (req,res, next) => {

  res.render('view/bookList.html', {bookData});
})

app.get('/adi', (req,res, next) => {

  res.render('view/audioBookView.html', {bookData});
})

app.get('/listen', (req,res, next) => {

  res.render('view/audioList.html', {bookData});
})

app.get('/lead', (req,res, next) => {

  res.render('view/community.html', {bookData});
})


// app.get('/', (req,res, next) => {

//   res.render('view/bookView.html', {bookData});
// })

app.listen(3005, () => {
  console.log("front opne");
  
})