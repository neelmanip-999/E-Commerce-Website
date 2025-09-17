const express = require('express');
const Product = require('../models/Product'); // import Product model
const router = express.Router() // mini express instance

// ---------- READ: show all products ----------
router.get('/products' , async(req,res)=>{
    let products = await Product.find({}); // fetch all products
    res.render('products/index' , {products}); // pass data to template
})


// ---------- CREATE: form to add new product ----------
router.get('/product/new' , (req,res)=>{
    res.render('products/new'); // render form page
})

// handle form submission (add product to DB)
router.post('/products' , async(req,res)=>{
    let {name , img , price , desc} = req.body; // extract from form
    await Product.create({name , img , price , desc}); // insert in DB
    res.redirect('/products'); // go back to product listing
})


// ---------- READ: show one product ----------
router.get('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id); // fetch product by id
    res.render('products/show' , {foundProduct});  // show product details
})


// ---------- UPDATE: form to edit product ----------
router.get('/products/:id/edit' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id); // fetch product
    res.render('products/edit' , {foundProduct});  // show edit form
})

// handle edit form submission (update in DB)
router.patch('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate(id , {name , img , price , desc});
    res.redirect(`/products/${id}`); // go back to product detail page
})


// ---------- DELETE: remove product ----------
router.delete('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id); // remove product from DB
    res.redirect('/products'); // back to listing
})

module.exports = router; // export router
