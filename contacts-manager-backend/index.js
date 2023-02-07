const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const dbServer = require("./database/mongoose");
const cors = require("cors");
const port = 8080;
const contactRoutes = require("./routes/contacts");

dbServer();
const app = express();
app.use(cors());
app.use(express.json());

app.set("/api/v1/contacts", contactRoutes);

app.listen(port, () => {console.log(`Port ${port} is running successfully...`)});