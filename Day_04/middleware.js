const {productSchema , reviewSchema} = require('./schema') // import Joi schemas for product & review validation


// 🟢 Middleware to validate product data from forms
const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body; // destructure product data from request body
    const {error} = productSchema.validate({name,img,price,desc}); // validate against productSchema

    if(error){
        // if validation fails, render error page
        return res.render('error'); 
    }

    next(); // if valid, proceed to next middleware or route handler
}


// 🟢 Middleware to validate review data from forms
const validateReview = (req,res,next)=>{  // fixed missing req,res,next parameters
    const {rating,comment} = req.body; // destructure review data from request body
    const {error} = reviewSchema.validate({rating,comment}); // validate against reviewSchema

    if(error){
        // if validation fails, render error page
        return res.render('error');
    }

    next(); // if valid, proceed to next middleware or route handler
}


module.exports = {validateReview , validateProduct} // export middleware to use in routes
