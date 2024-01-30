const express=require("express");
const zod =require("zod");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
const User=require("../database/db");
const Account=require("../database/accounts");
const {middleware}=require("../middleware/middleware");

const router=express.Router();

const signupbody = zod.object({
    username: zod.string(),
	firstname: zod.string(),
	secondname: zod.string(),
	password: zod.string()
})

router.post("/signup" ,async (req, res) => {
    const body = req.body;
    
    const { success } = signupbody.safeParse(body);
    const dbCheck = await User.findOne({ username: body.username });
    
    if (success && !dbCheck) {
        const user = await User.create(body);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        const balance = Math.round((Math.random() * 10000) * 100);

            await Account.create({userid: user._id, balance:balance});

        const token = jwt.sign({ userid: user._id }, JWT_SECRET);
        res.json({ msg: "User created successfully", token: token });
    } else {
        res.status(411).json({ msg: "Email already taken / Incorrect inputs" });
    }
});
const signinbody=zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post("/signin",async (req,res)=>{
    const body = req.body;
    
    const { success } = signinbody.safeParse(body);
    const dbCheck = await User.findOne({ username: body.username });
    
    if (success && !dbCheck) {
        const user = await User.create(body);
        
        const balance = Math.round((Math.random() * 10000) * 100);
        await Account.create({userid: user._id, balance: balance});

        const token = jwt.sign({ userid: user._id }, JWT_SECRET);
        res.json({ msg: "User created successfully", token: token });
    } else {
        res.status(411).json({ msg: "Email already taken / Incorrect inputs" });
    }
});

  
const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    secondname: zod.string().optional(),
});

router.put("/", middleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})
/*router.put("/", middleware ,async function(req,res){
    const {success}=updatebody.safeparse(req.body);
    if(!success){
        res.status(411).json({
            msg:"worng inputs are sent "
        })
    }

    await User.updateOne(req.body, {
        _id: req.userid
    })
    res.json({
        message:"User succesfully updated"
    })

})*/
router.get("/bulk",async function(req,res){
    const filter =req.query.filter || ""

    const users=await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
    
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user.userid

        }))
    })
});





module.exports=router;