var express = require('express');
var app = express();

var customer = require("./customers");



app.use('/customers', customer);
module.exports = app;