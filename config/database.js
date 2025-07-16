
const mongoose = require('mongoose');

//Connecting to MongoDB Cluster using Mongoose
//mongoose.connect("mongodb+srv://pallavibandikari:IF7aXPrQQ35lAfsf@cluster0.4avyblx.mongodb.net/")

//Connecting to Database using Mongoose
const connectDB = async () => {
await mongoose.connect("mongodb+srv://pallavibandikari:IF7aXPrQQ35lAfsf@cluster0.4avyblx.mongodb.net/DevTinder")
}

module.exports = connectDB;
//This will connect to the database and export the connection



//Data base connection established after server is started
//So first we need to connect the database and then start the server
//So we are importing this file in app.js and then starting the server