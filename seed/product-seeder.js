var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser : true});
var products = [new Product({
    imagePath :"https://media.roxytaiwan.com.tw/media/catalog/product/cache/thumbnail/500x500/9df78eab33525d08d6e5fb8d27136e95/a/r/arjs700124_setsessionii_p_wht_frt1.jpg",
    title : 'white shoes',
    description : 'white shoes',
    price : 1000
}),
    new Product({
        imagePath :"http://www.hiishop.com/wp-content/uploads/2018/03/02d95a72e1d9fcd7.jpg",
        title : 'black shoes',
        description : 'Adidas',
        price : 2800
    }),
    new Product({
        imagePath :"https://i1.wp.com/popbee.com/image/2015/03/nike-air-force-1-wmns-red-0001.jpg",
        title : 'Red Shoes',
        description : 'Nike',
        price : 5000
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