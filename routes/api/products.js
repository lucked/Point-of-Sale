/**
 * Created by Pierre on 05.04.16.
 */
var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Product = require("../../models/products");
var middleware = require("../../middleware/index.js");
//INDEX - show all Customers
router.get("/", function(req, res) {
    var regexid = /^[a-f\d]{24}$/i;
    var search = req.query.search;

    if (regexid.exec(search) !== null) {
        Product.findById(search, function(err, foundCustomer) {
            if (err) {
                console.log(err);
            } else {
                res.end(JSON.stringify([foundCustomer]));
            }
        });
    } else {
        var re = new RegExp(search,"i");
        var offset = 0;
        if (req.query.offset) {
            offset = req.query.offset;
        }
        Product.find().or([{
            'name': {
                $regex: re
            }
        }, {
            'description': {
                $regex: re
            }
        }, {
            'ordernumber': {
                $regex: re
            }
        }]).skip(parseInt(offset)).limit(20).exec(function(err, allCustomers) {
            if (err) {
                console.log(err);
            } else if (allCustomers.length === 0) {
                res.sendStatus(404);
            } else {
                res.end(JSON.stringify(allCustomers));
            }
        });
    }


});

module.exports = router;
