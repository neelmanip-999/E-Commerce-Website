// ---------------------- Server-side Validation Schemas ----------------------

// import Joi for data validation
const Joi = require('joi');

// 🟢 Product validation schema
// Ensures all product data from forms is valid before saving to DB
const productSchema = Joi.object({
    name: Joi.string().required(), // product name must be a non-empty string
    img: Joi.string().required(),  // image URL must be provided
    price: Joi.string().min(0).required(), // price must be a string >= 0 (can change to number if needed)
    desc: Joi.string().required()  // description must be provided
});

// 🟢 Review validation schema
// Ensures review data from forms is valid before saving to DB
const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(), // rating must be a string between 0-5
    comment: Joi.string().required() // comment cannot be empty
})

// export schemas to use in middleware
module.exports = {productSchema, reviewSchema}
