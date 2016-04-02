var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require("passport");
var orders = require("../models/orders");
var User = require("../models/users");
/* GET home page. */

router.get("/", function (req, res) {
  orders.find({},function (err, allorders) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {orders: allorders});
    }
  });
});


//========
//auth
router.get("/register", function (req, res) {
  res.render("auth/register")
});

router.post("/register", function (req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("auth/register")
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/")
    })

  })
});

router.get("/login", function (req, res) {
  res.render("auth/login")
});

router.post("/login", passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login"
    }
), function (req, res) {


});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/")
});
module.exports = router;
