var express = require ("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require ("../models/user");

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
      res.redirect("/campgrounds")
    })

  })
});

router.get("/login", function (req, res) {
    res.render("auth/login")
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
), function (req, res) {


});

router.get ("/logout", function (req,res) {
    req.logout();
    res.redirect("/campgrounds")
});


module.exports = router;
