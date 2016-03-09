/**
 * Created by Pierre on 28.02.16.
 */
var express = require ("express");
var router = express.Router({mergeParams: true});

var Product = require("../models/products");

//var middleware = require("../middleware");

//INDEX - show all Products
router.get("/", function (req, res) {
    Product.find({}, function (err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/index", {products: allProducts});
        }
    });
});

//CREATE - add new Product to DB
router.post("/", function (req, res) {
    var product = req.body.product;
    Product.create(product, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/products");
        }
    });
});

// UPDATE - Update / Edit a product
router.put ("/:id", function (req,res) {
    Product.findByIdAndUpdate(req.params.id, req.body.product, function (err,updatedcampground) {
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/products/")
        }

    })
});

// REMOVE - Delete a product
router.delete("/:id", function (req,res) {
    Product.findByIdAndRemove(req.params.id, function (err){
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/products")
        }
    })
});


module.exports = router;