const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
require('dotenv').config();
const bookData = require('./public/js/viewdata')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app
});

app.get('/', (req,res, next) => {

  res.render('view/bookView.html', {bookData});
  

})

app.listen(3005, () => {
  console.log("front opne");
  
})