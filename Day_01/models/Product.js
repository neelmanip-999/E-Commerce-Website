const mongoose = require('mongoose'); // import mongoose

// define product schema (structure of product data)
const productSchema = new mongoose.Schema({
    name: {
        type:String,      // product name is a string
        trim:true,        // removes extra spaces
        required:true     // must be provided
    } , 
    img:{
        type:String,      // image URL
        trim:true
    } ,
    price: {
        type:Number,      // product price is a number
        min:0,            // cannot be negative
        required:true
    } ,
    desc: {
        type:String,      // description
        trim:true
    }
})

// create model (to interact with products collection in DB)
let Product = mongoose.model('Product' , productSchema);

module.exports = Product; // export for use in other files
