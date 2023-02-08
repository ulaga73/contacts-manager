const express=require("express");
const User=require('../models/User');
const router=express.Router();
const bcrypt=require('bcryptjs');
const{body,validationResult}=require('express-validator')
let jwt=require("jsonwebtoken");
const fetchUser = require("../fetchUser");

const JWT_SECRET='ContactsManager';

//api to create a User
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password').isLength({min:6})
],async(req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,errors:"A User With Same Mail Id Exists"})
        }
        const salt=await bcrypt.genSalt(10);
        secpass=await bcrypt.hash(req.body.password,salt);

        user= await User.create({
            name:req.body.name,
            password:secpass,
            email:req.body.email
        })

        const data={
            user:{
                id:user.id
            }
        }

        const authToken=jwt.sign(data,JWT_SECRET)
        console.log(authToken)
        success=true;
        res.json({success,authToken})
    }catch{
        console.error(errors.message);
        res.status(500).send(success,"Internal error occured")
    }
})

//LOGIN OF USER
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cant be blank').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please login with correct credentials" })
        }
        const passwordCompare =await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({success, error: "please login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({ success,authToken })
    } catch (err) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

router.post('/getUser',fetchUser, async (req, res) => {

    try{
        userId=req.user.id;
        const user=await User.findById(userId).select('-password')
        res.send(user)
    }catch(error){
        console.error(error.message);
            res.status(500).send("Internal error occured")
    }
    })

module.exports = router