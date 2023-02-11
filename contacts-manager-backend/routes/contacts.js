const express = require("express");
const Contact = require("../models/contacts");
const fetchUser = require("../fetchUser");

const router = express.Router();

//POST API to add contacts
router.post("/", fetchUser, async(req, res) => {
  const { file } = req.files;
  const contacts = file.data.toString().split("\r\n");
  console.log(contacts);
  try{
    for(let i = 0; i < contacts.length; i++){
      let data = contacts[i].split(",");
      const postData = await Contact.create({
        name: data[0],
        designation: data[1],
        company: data[2],
        industry: data[3],
        email: data[4],
        phone: data[5],
        country: data[6],
        user: req.user.id
      })
      console.log(postData);
    }
    res.json({
      status: "success",
      result: "Uploaded files are added to the database"
    })
  }catch(err){
    console.error(err.message);
    res.status(400).json({
      status: "failure",
      message: err.message
    })
  }
});

// GET API to fetch all contacts
router.get('/', fetchUser, async (req, res) => {
  try {
    console.log(req.user.id);
      const getData = await Contact.find({ user: req.user.id });
      res.json({
        status: "success",
        result: getData
      })
  } catch (err) {
      console.error(err.message);
      res.status(400).json({
        status: "failure",
        message: err.message
      })
  }
})

//DELETE API to remove contacts
router.delete("/", async(req, res) => {
  console.log(req.body);
  const {delId} = req.body;
  try{
    for(let i = 0; i < delId.length; i++){
      const row = await Contact.findOne({_id: delId[i]});
      if(row){
        const delData = await Contact.deleteOne({_id: delId[i]});
        console.log(delData);
      }
    }
    res.json({
      status: true,
      result: "Selected files are deleted"
    })
  }catch(err){
    res.status(400).json({
      status: "failure",
      message: err.message
    })
  }
})

module.exports = router;
