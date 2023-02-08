const express = require("express");
const Contact = require("../models/contacts");
const fetchUser = require("../fetchUser");

const router = express.Router();

//POST API to add contacts
router.post("/", fetchUser, async(req, res) => {
  const { file } = req.files;
  const data = file.data.toString().split(",");
  try{
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
    console.log(postData);
    res.json({
      status: "success",
      result: postData
    })
  }catch(err){
    console.error(err.message);
    res.status(400).json({
      status: "failure",
      message: err.message
    })
  }
});

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
router.delete("/:id", async(req, res) => {
  console.log(req.params);
  try{
    const delData = await Contact.deleteOne({_id: req.params.id});
    console.log(delData);
    res.json({
      status: "success",
      result: delData
    })
  }catch(err){
    res.status(400).json({
      status: "failure",
      message: err.message
    })
  }
})

module.exports = router;
