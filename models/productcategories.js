/**
 * Created by Pierre on 27.02.16.
 */
var mongoose = require("mongoose");

var productcategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    hexcolor: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Productcategory", productcategorySchema);
