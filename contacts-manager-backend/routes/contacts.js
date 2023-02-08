const express = require("express");
const Contact = require("../models/contacts");
const fetchUser = require("../fetchUser");

const router = express.Router();

//POST API to add contacts
router.post("/", fetchUser, async(req, res) => {
  const { file } = req.files;
  const data = file.data.toString().split(",");
  console.log(data);
  try{
    const postData = await Contact.create({
      user: req.user.id,
      name: data[0],
      designation: data[1],
      company: data[2],
      industry: data[3],
      email: data[4],
      phone: data[5],
      country: data[6]
    })
    // console.log(req.body);
    // const{name, designation, company, industry, email, phone, country} = req.body;
    // const postData = await Contact.create({
    //   name,
    //   designation,
    //   company,
    //   industry,
    //   email,
    //   phone,
    //   country,
    //   user: req.user.id
    // })
    res.json({
      status: "success",
      result: postData
    })
  }catch(e){
    res.status(400).json({
      status: "failure",
      message: e.message
    })
  }
});

//DELETE API to remove contacts
router.delete("/:id", (req, res) => {
  console.log(req.params);

})

module.exports = router;
