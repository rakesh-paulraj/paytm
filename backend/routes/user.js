const express=require("express");
const zod =require("zod");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
const User=require("../database/db");
const middleware=require("../middleware/middleware");

const router=express.Router();


const signupbody=zod.object({
    username:zod.string.email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})

router.post("/signup",async (res,res)=>{
    const {success}=signupbody.safeparse(req.body);
    if(!success){
        res.status(411).json({
            msg:"invalid input | username already exist"
        })
    }
    const existinguser=await User.findone({
        username:req.body.username
    })
    if(existinguser){
        res.status(411).json({
            msg:"invalid input | username already exist"
        })
    }
    const user = await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    })
    const userid=user._id;

    const token=jwt.sign({
        userid
    },JWT_SECRET);
    
    res.json({
        message:"User created successfully",
        token:token
    })

})
const signinbody=zod.object({
    username:zod.String.email(),
    password:zod.String()
})

router.post("/signin",async (req,res)=>{
    const {success}=signinbody.safeparse(req.body);
    if(!success){
        res.status(404).json({
            msg:"wrong inputs or user unavailable"
        })
    }
    const user=User.findone({
        username:req.body.username,
        password:req.body.password
    })
    if (user) {
        const token = jwt.sign({
            userid: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})



module.exports=router;