const express =require("express");
const { middleware } = require("../middleware/middleware");
const Account=require("../database/accounts");
const router =express.Router();
const mongoose = require("mongoose");




router.get("/balance", middleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});



router.post("/transfer", middleware, async (req, res) => {
   
  try{
  const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficent Balance",
      });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "The user does not exsist",
      });
    }
  
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);
    await session.commitTransaction();
    res.json({
      message: "Transaction successfull",
    });
  }catch(err){
    console.error("Error during transaction:", err);
  }
  
  });



module.exports=router;