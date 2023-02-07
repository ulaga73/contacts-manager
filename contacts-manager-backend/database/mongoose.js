const mongoose = require("mongoose");

async function dbServer(){
    await mongoose.connect("mongodb+srv://ulaganathan:ulaganathan@group7.dsd47vl.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database is running successfully...");
}

module.exports = dbServer;