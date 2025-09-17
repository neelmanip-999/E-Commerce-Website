const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// cookie-parser middleware
// without secret → normal cookies
// with secret → signed cookies (extra layer of security)
app.use(cookieParser('youneedabettersecret'));


// route: home page
app.get('/' , (req,res)=>{
    console.log(req.cookies);       // shows all normal cookies in terminal
    // res.send(req.cookies);       // if you want to see all normal cookies in browser
    res.send(req.signedCookies);    // send signed cookies only
})


// route: send signed cookie
app.get('/getsignedcookies' , (req,res)=>{
    // creates a signed cookie named 'bindaas'
    // signing ensures the cookie value cannot be tampered with (server can detect changes)
    res.cookie('bindaas' , 'sachin' , {signed:true} )
    res.send('cookies sent successfully');
})


// ---------------------- BASIC COOKIE EXAMPLES (COMMENTED OUT) ----------------------

// route: set normal cookies (not signed)
// app.get('/setcookie' , (req,res)=>{
//     res.cookie('mode' , 'dark');          // theme preference
//     res.cookie('location' , 'delhi');     // user location
//     res.cookie('username' , 'samarth');   // username
//     res.send('server sent you cookies');
// })

// route: read cookies sent by client
// app.get('/getcookies' , (req,res)=>{
//     // destructure cookies from req.cookies
//     let {mode , location , username} = req.cookies;
//     res.send(`name is ${username}, stay in ${location} and theme is ${mode}`);
// })

// ----------------------------------------------------------------------------------


// start server
app.listen(8080 , ()=>{
    console.log("server connected at 8080")
})





// 🔑 Key Notes
// Normal cookies (req.cookies)
// Stored on client browser.
// Can be modified by the client → not secure.
// Signed cookies (req.signedCookies)
// Server signs them using the secret ('youneedabettersecret').
// If the value is tampered with, signature check fails → server rejects it.
// res.cookie(name, value, options)
// Used to send cookies.
// {signed:true} → makes it a signed cookie.
// Cookie lifecycle
// Client makes request → server sends cookies in response.
// Browser saves cookies → automatically sends them back with each future request.





// Cookies are small pieces of data that a server sends to a client’s browser, which the browser stores and automatically sends back with subsequent requests to the same server. They are commonly used to remember information about the user, such as login status, preferences, or session data. In this code, the cookie-parser middleware is used to handle cookies in Express. When the server sends a cookie using res.cookie(), it is stored in the client’s browser. Normal cookies can be read via req.cookies, but they can be tampered with by the client. To prevent this, signed cookies are created using a secret (cookieParser('youneedabettersecret')) and marked with {signed:true}. These signed cookies are verified by the server on each request, and their values are accessible via req.signedCookies. For example, when the /getsignedcookies route is accessed, the server sends a signed cookie named bindaas with the value sachin. Later, when the client visits /, the server reads and sends back all signed cookies, demonstrating how cookies store and transport user-specific data between client and server.