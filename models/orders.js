var mongoose = require("mongoose");

var OrderSchema = mongoose.Schema({
    info: String,
    delivered: {type: Boolean, default: false},
    ordered: {type: Date, default: Date.now},
    // to be added when login / user management is enabled
    //employer: {
    //    id: {
    //        type: mongoose.Schema.Types.ObjectId,
    //        ref: "User"
    //    },
    //    username: String
    //},
    customer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        Customer: String
    },
    products: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

});

module.exports = mongoose.model("Order", OrderSchema);