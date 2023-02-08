const express = require('express');
const router = express.Router();
const fetchUser = require("../fetchUser")
const Contact = require("../models/contacts")

router.get('/fetchallcontacts', fetchUser, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.json(contacts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router;