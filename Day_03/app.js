const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const ejsMate = require('ejs-mate'); // layout engine for ejs
const methodOverride = require('method-override') // to support PUT & DELETE in forms
const productRoutes = require('./routes/product') // product-related routes
const reviewRoutes = require('./routes/review')   // review-related routes

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shopping-sam-app')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})

// setting up ejs-mate as view engine
app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views')); // set path to "views" folder

// middleware
app.use(express.static(path.join(__dirname , 'public'))); // serve static files (CSS, JS, images)
app.use(express.urlencoded({extended:true})); // parse form data (req.body)
app.use(methodOverride('_method')); // allow overriding methods via query string (?_method=PUT/DELETE)

// seeding database (uncomment to run seed script once)
// seedDB()

// route middlewares
app.use(productRoutes); // all product routes
app.use(reviewRoutes);  // all review routes

// start server
app.listen(8080 , ()=>{
    console.log("server connected at port 8080")
})
