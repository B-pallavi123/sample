
const express = require('express');
const app = express();
const {adminAuth, userAuth} = require('./Middlewares/Auth');
require("./config/database.js");
const connectDB = require('./config/database');

//Connecting to the database
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777,() =>{
    console.log("Server is running on port 7777....");
});
}).catch((err) => {
    console.error("Database connection failed", err);
})


//Error Handling 
//Method-1
app.get("/error", (req,res) => {
    console.log("Handling Error")
    throw new Error("Pallavi is a Good Girl")
})

//Method-2
app.get("/error1", (req,res) => {
    try{
    console.log("Handling Error")
    throw new Error("Pallavi is a Good Girl")}
    catch(err){
        res.status(500).send("Something went wrong...., contact your service team")
    }
})

//Why use middlewares?
//Code Reusability
//Code Organization

//Admin Route Handlers

//Method-1
app.get("/admin/getdata", adminAuth, (req, res) => {
    res.send("Data Fetched successfully for Admin.")});


app.delete("/admin/deletedata", adminAuth, (req, res) => {
    res.send("Data deleted successfully for Admin.")});

//Method-2
app.use("/user", userAuth)

app.get("/user/getdata", (req, res) => {
    res.send("Data Fetched successfully for User.")});


app.delete("/user/deletedata", (req, res) => {
    res.send("Data deleted successfully for user.")});

//Multiple Route Handlers 
//app.use("/user",rh1,rh2,rh3,rh4,rh5)
app.use("/abc", [(req, res, next) => {
    console.log("First Middleware");  
    next();
    //res.send("Hello from the first middleware!"); // Send response to the client
    // Pass control to the next middleware
},(req, res, next) => {
    console.log("Second Middleware");
    next();
    //res.send("Hello from the second middleware!"); 
     // Pass control to the next middleware
},(req, res, next) => {
    console.log("Third Middleware");
    next();
    //res.send("Hello from the Third middleware!"); 
     // Pass control to the next middleware
},(req, res, next) => {
    console.log("Fourth Middleware");
    next();
    //res.send("Hello from the Fourth middleware!"); 
     // Pass control to the next middleware
},(req, res, next) => {
    console.log("Fifth Middleware");
     res.send("Hello from the fifth middleware!"); 
     // Pass control to the next middleware
}]);


//Regular expressions => ?,+,*,()
// /anyletter/, /.*fly$/
//app.get("/ab+c",(req,res)=>{

//    res.send("Data Fetched successfully.")
//});



//Dynamic Routing
app.get("/user/:userid/:password",(req,res)=>{
    console.log(req.params);
    res.send("Data Fetched successfully.")
});


//Http methods
// GET, POST, PUT, PATCH, DELETE

app.get("/user",(req,res)=>{
    console.log(req.query);
    res.send("Data Fetched successfully.")
});

app.post("/user",(req,res)=>{
    res.send("Data Saved in the Database successfully.")
});

app.delete("/user",(req,res)=>{
    res.send("Data Deleted successfully.")
});

app.use("/user",(req,res)=>{
    res.send("Pallavi is a Good Girl.")
});

//Ordering of routes matters
// If you put /hello before /hello/jasu, then /hello/jasu will never


app.use("/test", (req,res) =>{
    res.send("Hello from the server")
});

app.use("/hello/jasu", (req,res) =>{
    res.send("Hello hello hello jasu")
});

app.use("/hello", (req,res) =>{
    res.send("Hello hello hello")
});

app.use("/hello/pal", (req,res) =>{
    res.send("Hello hello hello pal")
});


//app.use("/", (req,res) =>{
    //res.send("Hello")
//});

app.use("/", (err,req,res,next) =>{
    if(err){
        res.status(500).send("Something went wrong......")
    }
});



