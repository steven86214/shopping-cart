var express = require('express');
var router = express.Router();

var Cart =require('../models/cart');
var Product = require('../models/product');
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err , docs) {
    var productChunks = [];
    var chunksize = 3;
    for(var i = 0;i<docs.length;i+=chunksize){
      productChunks.push(docs.slice(i,i + chunksize));
    }
    res.render('shop/index', {title: 'shopping-cart', products: docs});
  });

});

router.get('/add-to-cart/:id',function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart :{});

  Product.findById(productId,function (err,product) {
    if(err ){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart',function (req,res,next) {
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products : null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products : cart.generateArray(),totalPrice : cart.totalPrice});
});

router.get('/checkout',function(req,res,next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout',{total:cart.totalPrice});
});

router.get('/item/:id',function (req,res,next) {
  var productId = req.params.id;
  Product.findById(productId,function (err,product) {
    if(err ){
      return res.redirect('/');
    }
    res.render('shop/itemInfo',{title:product.title,
                                imgPath:product.imagePath,
                                description:product.description ,
                                price:product.price});
  });
});

router.get('/search/:title',function (req,res,next) {
  var searchTitle = req.params.title;
  Product.find({"title" : {"$regex" : searchTitle , "$options": "i"} },function (err , docs) {
    var productChunks = [];
    var chunksize = 3;
    for(var i = 0;i<docs.length;i+=chunksize){
      productChunks.push(docs.slice(i,i + chunksize));
    }
    console.log(docs);
    res.render('shop/searchResult', {title: 'Search Result', products: docs});
  });

});
module.exports = router;