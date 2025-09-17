const express = require('express'); // framework to build web server
const app = express();              // create express app
const path = require('path');       // helps handle file paths
const mongoose = require('mongoose'); // for MongoDB connection
const seedDB = require('./seed')    // script to insert dummy data
const productRoutes = require('./routes/product') // routes for products


// connect to MongoDB database "shopping-app"
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})


// ---------- App Config ----------
app.set('view engine' , 'ejs'); // use EJS templates for HTML rendering
app.set('views' , path.join(__dirname , 'views')); // where views are stored
app.use(express.static(path.join(__dirname , 'public'))); 
// "public" folder will serve static files like css, js, images


// ---------- Database Seeder ----------
// seedDB()   // (uncomment to fill DB with sample products)


// ---------- Routes ----------
app.use(productRoutes); 
// all product-related routes handled here (like /products)


// ---------- Server ----------
app.listen(8080 , ()=>{
    console.log("server connected at port 8080")
})
