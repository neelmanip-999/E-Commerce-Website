const express = require('express');
const router = express.Router() // mini Express router instance
const Product = require('../models/Product') // Product model
const Review = require('../models/Review')   // Review model
const {validateReview} = require('../middleware') // middleware to validate review data

// 🟢 POST route to add a new review for a specific product
router.post('/products/:id/review' , validateReview , async(req,res)=>{
    try{
        let {id} = req.params;          // get product ID from URL
        let {rating,comment} = req.body; // get review data from form

        const product = await Product.findById(id); // find the product in DB
        const review = new Review({rating,comment}); // create a new Review document

        // associate review with product
        product.reviews.push(review); // add review's ObjectId to product's reviews array

        await review.save();  // save review to DB
        await product.save(); // save updated product to DB (with new review)

        res.redirect(`/products/${id}`); // redirect back to the product detail page
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}); // handle errors gracefully
    }
})

module.exports = router; // export router to use in main app
