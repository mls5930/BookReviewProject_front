const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const router = require("./router/router")

app.use(router)
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app
});


app.listen(3005, () => {
  console.log("front opne");
  
})