const connectToMongo = require("./db");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express();
const port = 5000 || process.env.PORT;
var cors = require("cors");
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(express.json());

connectToMongo();
app.use(express.json());
app.use(fileUpload());


app.use('/api/auth',require('./routes/auth'))
app.use("/api/contacts", require("./routes/contacts"));


app.get("/", (req, res) => {
  res.send("Hello Contacts-Manager");
});

app.listen(port, () => {
  console.log(`contacts manager backend is listening on port ${port}`);
});
