var express = require("express");
var router = express.Router({
    mergeParams: true
});


var customer = require("../models/customers");
var product = require("../models/products");
var order = require("../models/orders");


router.get("/new", function(req, res) {
    customer.findById(req.params.id, function(err, customer) {
        if (err) {
            console.log(err);
        } else {
            product.find({}, function(err, allProducts) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("orders/new", {
                        customer: customer,
                        products: allProducts
                    });

                }
            });
        }

    });
    //res.render("comments/new")
});

router.post("/", function(req, res) {
    customer.findById(req.params.id, function(err, customer) {
        if (err) {
            console.log(err);
            res.redirect("/customers");
        } else {
            var neworder = {
                info: req.body.info,
                customer: {
                    Customer: customer.name,
                    id: customer._id
                },
                products: req.body.orderlist
            };
            order.create(neworder, function(err, order) {
                if (err) {
                    console.log(err);
                } else {
                    customer.orders.push(order);
                    customer.save();

                    res.redirect('/customers');
                }
            });

        }
    });
});
//
//router.get ("/:comment_id/edit",middleware.checkCommentOwnership, function (req,res) {
//    console.log (req.params.id)
//    Comment.findById(req.params.comment_id, function (err, foundComment) {
//
//        if (err) {
//            res.redirect("/campgrounds")
//        } else {
//            res.render ("comments/edit", {comment: foundComment, campground_id: req.params.id})
//        }
//    })
//});
//
//router.put ("/:comment_id",middleware.checkCommentOwnership, function (req,res) {
//    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err,updatedComment) {
//        if (err) {
//            res.redirect("/campgrounds")
//        } else {
//            res.redirect("/campgrounds/" + req.params.id)
//        }
//
//
//    })
//});
//
//router.delete("/:comment_id",middleware.checkCommentOwnership, function (req,res) {
//    Comment.findByIdAndRemove(req.params.comment_id, function (err){
//        if (err) {
//            res.redirect("/campgrounds")
//        } else {
//            req.flash ("success", "Deleted your Comment");
//
//            res.redirect("/campgrounds/"+req.params.id)
//        }
//    })
//});
//
//

module.exports = router;
