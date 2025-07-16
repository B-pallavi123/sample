//Creating User Schema 
const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true,
            minlength:4

        },
        lastName:{
            type: String
        },
        emailId:{
            type: String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
             validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email. Please enter a valid email address.")
                }
            }
        },
        password:{
            type: String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.")
                }
            }
        },
        age:{
            type: Number
        },
        about:{
            type: String,
            default: "No information provided"
        },
        gender:{
            type: String,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("Invalid Gender")
                }
            }
        },
        skills:{
            type:[String],
        },
    },{timestamps:true}
)

//Creating User Model
const User = mongoose.model('User', userSchema); // User => Model name 
module.exports = User;
//This will create a User collection in the database with the schema defined above