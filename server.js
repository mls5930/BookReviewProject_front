const express = require('express');
const app = express();
require('dotenv').config();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const middlewarejwt = require('./middleware.js');
const axios = require('axios');

app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app
});