const connectToMongo=require("./db");
const express=require("express");
const app=express();
const port=5000;
var cors = require('cors');
app.use(cors());
app.use(express.json());

connectToMongo();
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))

app.get("/",(req,res)=>{
    res.send("Hello Contacts-Manager")
})

app.listen(port,()=>{
    console.log(`contacts manager backend is listening on port ${port}`)
})