var express = require('express');
var app = express();

var customer = require("./customers");
var product = require("./products");


// TODO add api routes for products customers orders
app.use('/customers', customer);
app.use('/products', product);

module.exports = app;