/**
 * Created by Pierre on 27.02.16.
 */
var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    ordernumber: String,
    description: String
});

module.exports = mongoose.model("Product", productSchema);