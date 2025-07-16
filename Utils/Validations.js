const validator=require("validator")
const validateSignUpData = (req) => {
   const {firstName, lastName, emailId, password} = req.body;
    if (!firstName || !lastName){
        throw new Error("First name and last name are required.");
    } 
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email Id");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.");
    }
}

module.exports={validateSignUpData};