const express =require("express");
const { middleware } = require("../middleware/middleware");
const {Account}=require("../database/db");
const router =express.Router();


router.get("/balance",middleware,async function(req,res){
try{
    const account = await Account.findOne({
        userid:req.userid
    });
    if(!account){
        res.status(411).json({
            msg:"invalid user id"
        })
    }
    res.json({
        balance:account.balance
    })

}
catch(error){
    console.error(error);
    res.status(500).json({
        msg: "Internal Server Error"
    });
}
});


router.post("/transfer",middleware,async function(req,res){
    const session =await mongoose.startSession();
    session.startTransaction();
    const { amount , to }=req.body;

    const account = await Account.findOne({ 
        userid: req.userid 
    }).session(session);

    if(!account || account.balance<amount){
        await session.AbortTransaction();
        return res.status(400).json({
            msg:"Insufficient balance"
        });
    }

    const toaccount= await Account.findOne({
        userid:to 
    }).session(session);

    if(!toaccount){
        await session.AbortTransaction();
        res.status(400).json({
            msg:"inavlid user "
        });

    }

    await Account.updateone({userid:req.userid},{$inc:{balance:-amount}}).session(session);
    await Account.updateone({userid:to},{$inc:{balance:amount}}).session(session);

    await session.committransaction();
    res.json({
        msg:"transfer completed"
    });
});


module.exports=router;