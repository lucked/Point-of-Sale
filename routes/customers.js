/**
 * Created by Pierre on 28.02.16.
 */
var express = require("express");
var router = express.Router({mergeParams: true});

var customer = require("../models/customers");

//var middleware = require("../middleware");

//INDEX - show all Products
router.get("/", function (req, res) {
    customer.find({}, function (err, allCustomers) {
        if (err) {
            console.log(err);
        } else {
            res.render("customers/index", {customer: allCustomers});
        }
    });
});

//CREATE - add new Product to DB
router.post("/", function (req, res) {
    var newcustomer = req.body.customer;
    customer.create(newcustomer, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/customers");
        }
    });
});


// UPDATE - Update / Edit a product
router.put("/:id", function (req, res) {

    customer.findByIdAndUpdate(req.params.id, req.body.customer, function (err) {
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/customers")
        }

    })
});

// REMOVE - Delete a product
router.delete("/:id", function (req, res) {
    customer.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/customers")
        }
    })
});


module.exports = router;