const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../models/user");


exports.signup=async(req,res)=>{
    try { 
        const checkUser=await User.findOne({
            email:req.body.email
        })
        if(checkUser)
        {
            res.status(409).send('User already exists');
            return;
        }

        const {password}=req.body;
        const salt=await bcrypt.genSalt(11);
        const hashedPassword=await bcrypt.hash(password,salt);
        const userToBeAdded=new User({...req.body,password:hashedPassword})
        const user=await userToBeAdded.save();
        res.send({user,msg:"Signup Successful"})
    } catch (error) {
        console.log(error);
    }
}

exports.signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(user){
            const verify=await bcrypt.compare(password,user.password);
            if(verify){
                const token=jwt.sign({email,password},process.env.SECRET,{expiresIn:"1hr"})
                res.send({token,userId:user._id}) 
            }else{
                res.status(401).send("Wrong Password");
            }
        }else{
            res.status(404).send("User does not Exists")
        }

    } catch (error) {
        console.log(error);
        
    }
}