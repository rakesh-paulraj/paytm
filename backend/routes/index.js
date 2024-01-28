const express=require("express");
const userrouter=require("./user");
const accountsrouter=require("./account");
const router =express.Router();


router.use("/user",userrouter);
router.use("/account",accountsrouter);
module.exports=router;