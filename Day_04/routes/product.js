const express = require('express');
const Product = require('../models/Product'); // Product model
const Review = require('../models/Review');   // Review model
const router = express.Router() // mini Express router instance
const {validateProduct} = require('../middleware') // custom middleware to validate product data


// ---------------------- ROUTES ----------------------

// 🟢 GET all products
router.get('/products' , async(req,res)=>{
    try{
        let products = await Product.find({}); // fetch all products from DB
        res.render('products/index' , {products}); // render products/index.ejs with products data
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}); // handle DB errors
    }
})


// 🟢 GET form to add a new product
router.get('/product/new' , (req,res)=>{
    try{
        res.render('products/new'); // render new product form
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


// 🟢 POST a new product
router.post('/products' , validateProduct ,   async(req,res)=>{
    try{
        let {name , img , price , desc} = req.body; // destructure form data
        await Product.create({name , img , price , desc}) // create and save product to DB
        res.redirect('/products'); // redirect to all products page
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


// 🟢 GET a single product by ID (with populated reviews)
router.get('/products/:id' , async(req,res)=>{
    try{
        let {id} = req.params;
        // populate 'reviews' array so we can access review details in EJS
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show' , {foundProduct}) // render product detail page
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


// 🟢 GET form to edit a product
router.get('/products/:id/edit' , async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id); // fetch product from DB
        res.render('products/edit' , {foundProduct}) // render edit form with current values
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


// 🟢 PATCH route to update a product
router.patch('/products/:id' , validateProduct ,  async(req,res)=>{
    try{
        let {id} = req.params;
        let {name , img , price , desc} = req.body; // updated data from form
        await Product.findByIdAndUpdate( id , {name , img , price , desc}  ) // update DB
        res.redirect(`/products/${id}`); // redirect to updated product page
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


// 🟢 DELETE a product
router.delete('/products/:id' , async(req,res)=>{
    try{
        let {id} = req.params;
        const product = await Product.findById(id); // fetch product

        // If you want to manually delete reviews associated with this product
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }

        await Product.findByIdAndDelete(id); // delete product from DB
        res.redirect('/products'); // redirect to all products page
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
})


// export router to use in main app
module.exports = router;
