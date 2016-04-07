var express = require('express');
var app = express();

var customer = require("./customers");


// TODO add api routes for products customers orders 
app.use('/customers', customer);
module.exports = app;