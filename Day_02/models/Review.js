const mongoose = require('mongoose'); // import mongoose

// define schema for reviews
const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number, // numeric rating
        min:0,       // minimum value allowed
        max:5        // maximum value allowed
    },
    comment:{
        type:String, // review text
        trim:true    // removes extra spaces
    }
})

// create Review model (interacts with 'reviews' collection in DB)
let Review = mongoose.model('Review' , reviewSchema);

module.exports = Review; // export for use in routes or other files
