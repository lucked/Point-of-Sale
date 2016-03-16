var mongoose = require("mongoose");
var product = require("./models/products");
var Faker = require('faker');
var arr = [];

for (i=0; i<100; i++) {
    var obj= {
        name : Faker.commerce.productName(),
        price : Faker.commerce.price(),
        description:  Faker.lorem.sentence(1),
        ordernumber: Math.floor((Math.random() * 200) + 1)
    };
    arr.push(obj);

}
//console.log (arr);


function seedDB(){
    //Remove all campgrounds
    product.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed products!");
        arr.forEach(function(seed){
            product.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a product");
                }
            });
        });
    });
}


module.exports = seedDB;
