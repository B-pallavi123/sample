const express = require('express');
const app = express();
require("./config/database.js");
const connectDB = require('./config/database');
const  User = require('./models/user');
const { validateSignUpData } = require('./Utils/Validations.js');
const bcrypt = require('bcrypt')



//Connecting to the database
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777,() =>{
    console.log("Server is running on port 7777....");
});
}).catch((err) => {
    console.error("Database connection failed", err);
})



//Defining the middleware to parse JSON data
app.use(express.json());

//Signup route after applying validations in the user model
app.post("/signup", async (req, res) => {
   
    
    try {
         validateSignUpData(req)
         const { firstName, lastName, emailId, password } = req.body;
         const hashPassword= await bcrypt.hash(password, 10);
         const user = new User({firstName, lastName, emailId, password: hashPassword});
         console.log(user)
        await user.save();
        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(400).send("Error creating user: " + err.message);
    }
});

//Login api
app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).send("Login successful");
        } else {
            res.status(400).send("Invalid email or password");
        }
    } catch (err) {
        res.status(500).send("Error logging in: " + err.message);
    }

});

//Passing data Dynamically  to the database
/*
app.post("/signup", async (req, res) => {
    //Creating new instance of User Model
    //This will create a new user in the database with the schema defined in models/user.js
    const user = new User(req.body);
    console.log(user)
    try {
        await user.save();
        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(400).send("Error creating user: " + err.message);
    }
}); */

//Fetching  the data from the database
//Getting all the users from the database
app.get("/getall", async (req, res) => {
    try {
        
        const users = await User.find({});//Returns array of objects 
        if(users.length === 0) {
            return res.status(404).send("No users found");}
        else{
            res.status(200).send(users);
        }
       
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
})

//Filtering the data from the database by email
app.get("/getByEmail", async (req, res) => {
    const email = req.body.emailId; // Assuming email is passed as a query parameter
    try {
        const users = await User.find({emailId : email});//Returns array of objects 
         if(users.length === 0) {
            return res.status(404).send("No users found with the provided email");
        }
        else{
           res.status(200).send(users);
        }
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
})

//findone with duplicate email
app.get("/getByEmailOne", async (req, res) => {
    const email = req.body.emailId; // Assuming email is passed as a query parameter
    try {
        const users = await User.findOne({emailId : email});//Returns array of objects 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
})

//Filtering the data from the database by id
app.get("/getById", async (req, res) => {
    const userId = req.body.userId; // Assuming email is passed as a query parameter
    try {
        const users = await User.findById(userId);//Returns array of objects 
         if(users.length === 0) {
            return res.status(404).send("No users found with the provided email");
        }
        else{
           res.status(200).send(users);
        }
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
})


//Deleting the user from the database by id
app.delete("/deleteById", async (req, res) => {
    //const userId = req.body.userId; // Assuming userId is passed in the request body
    const name = req.body.firstName; // Assuming name is passed in the request body
    try {
        //const user = await User.findByIdAndDelete(userId) //we can pass only Id  to delete the user
        const user = await User.findOneAndDelete({ firstName: name }); //we can pass any field to delete the user
        res.send("User deleted successfully");
        
       
    }
    catch(err){
        res.status(500).send("Error deleting user: " + err.message);
    }

});

//Updating the user in the database by id
app.patch("/updateById/:userId", async (req, res) => {
    const userId = req.params?.userId; // Assuming userId is passed in the request body
    const updateData = req.body; // Assuming the updated data is passed in the request body
    try {
        const Allowed_updates=["firstName","lastName","password","age","about","gender","skills"]
        const isUpdatesAllowed = Object.keys(updateData).every((update) => Allowed_updates.includes(update));
        if (!isUpdatesAllowed) {
            return res.status(400).send("Invalid update fields");
        }
        const user = await User.findByIdAndUpdate(userId, updateData,{returnDocument:"after",runValidators:true});
        console.log(user) // Returns the updated user
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User updated successfully");
    } catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
});

//Updating the user in the database by Email id
app.patch("/updateByEmailId", async (req, res) => {
    const emailId = req.body.emailId; // Assuming userId is passed in the request body
    const updateData = req.body; // Assuming the updated data is passed in the request body
    try {
        const user = await User.findOneAndUpdate({emailId:emailId}, updateData); // Returns the updated user
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User updated successfully");
    } catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
});


//Passing hardcoded data to the database
/*
app.post("/signup", async (req, res) => {
    //Creating new instance of User Model
    //This will create a new user in the database with the schema defined in models/user.js
    const user = new User({
        firstName: "Pallavi",
        lastName: "Bandikari",
        emailId: "Pallavi@gmail.com",
        password: "Pallavi123",
        age: 21
    })
    try{
    await user.save()
    res.status(201).send("User created successfully");
    }
    catch(err){
        res.status(400).send("Error creating user: " + err.message);
    }
})
    */

/*"firstName":"Hani",
"lastName":"Harshini",
"emailId":"hani@gmail.com",
"password":"Hani@123",
"age":21,
"about":"No information provided",
"gender":"female",
"skills":["CS"] */