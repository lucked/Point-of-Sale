var express = require('express');
var router = express.Router();
var orders = require("../models/orders");
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
module.exports = router;
