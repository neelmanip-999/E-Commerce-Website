const express = require('express'); // import express
const Product = require('../models/Product'); // import product model
const router = express.Router() // create mini router

// route: get all products
router.get('/products' , async(req,res)=>{
    let products = await Product.find({}); // fetch all products from DB
    res.render('products/index' , {products}); // render view with products
})

module.exports = router; // export router
