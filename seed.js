var mongoose = require("mongoose");
var product = require("./models/products");
var customer = require("./models/customers");
var Faker = require('faker');
var arr = [];
var customers = [];

for (i=0; i<100; i++) {
    var obj= {
        name : Faker.commerce.productName(),
        price : Faker.commerce.price(),
        description:  Faker.lorem.sentence(1),
        ordernumber: Math.floor((Math.random() * 200) + 1)
    };
    arr.push(obj);

}
for (i = 0; i < 100; i++) {
    var obj = {
        phone: Faker.phone.phoneNumber(),
        name: Faker.name.lastName(),
        mail: Faker.internet.email(),
        street: Faker.address.streetName(),
        housenumber: Math.floor((Math.random() * 200) + 1),
        city: "Berlin",
        zipcode: Faker.address.zipCode(),
        story: Math.floor((Math.random() * 10) + 1)
    };
    customers.push(obj);
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

    customer.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed products!");
        customers.forEach(function (seed) {
            customer.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a customer");
                }
            });
        });
    });

}

module.exports = seedDB;
