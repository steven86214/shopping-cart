var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser : true});
var products = [new Product({
    imagePath :"https://i.imgur.com/lyT7rPx.jpg",
    title : 'Gothic Video Game',
    description : 'good game',
    price : 10
}),
    new Product({
        imagePath :"https://i.imgur.com/lyT7rPx.jpg",
        title : 'Gothic Video Game',
        description : 'good game',
        price : 10
    }),
    new Product({
        imagePath :"https://i.imgur.com/lyT7rPx.jpg",
        title : 'Gothic Video Game',
        description : 'good game',
        price : 10
    })
];
var done = 0;
for (var i = 0;i<products.length;i++){
    products[i].save(function (err , result) {
        done++;
        if(done == products.length){
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}