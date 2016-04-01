/**
 * Created by Pierre on 27.02.16.
 */
var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    customernumber: String,
    street: String,
    housenumber: String,
    city: String,
    deleted: {type: Boolean, default: false},
    zipcode: String,
    story: String,

    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

module.exports = mongoose.model("Customer", CustomerSchema);