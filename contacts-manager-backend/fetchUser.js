var jwt = require('jsonwebtoken');
const JWT_SECRET = 'ContactsManager';
const fetchUser=(req,res,next)=>{
    //fethces auth-token form the header of the req object
    const token=req.header('auth-token');
    console.log(token);
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET)
        console.log(data);
    req.user=data.user;
    next()
    }catch(error){
        res.status(401).send({error:"please authenticate using valid token"})
    }   
    
}


module.exports=fetchUser