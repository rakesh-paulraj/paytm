const express=require("express");
const { Router } = require("express");
const userrouter=require("./user");
const accountsrouter=require("./account");
const router =Router();


router.use("/user",userrouter);
router.use("/account",accountsrouter);
module.exports=router;