/**
 * Created by Pierre on 27.02.16.
 */
var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    ordernumber: String,
    deleted: {
        type: Boolean,
        default: false
    },
    description: String
});

module.exports = mongoose.model("Product", productSchema);