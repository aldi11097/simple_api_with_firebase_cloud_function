const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const user = require('./user_module/user.js')

app.use('/user', user);
app.use(bodyParser.urlencoded({
  exteded: false
}));
app.use(bodyParser.json());

exports.api = functions.https.onRequest(app);
