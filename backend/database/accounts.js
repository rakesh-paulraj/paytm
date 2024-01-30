const mongoose=require("mongoose");
const {Schema,model}=require ("mongoose");

mongoose.connect("mongodb+srv://admin:fQ8qLRJqWtSwH33G@cluster0.mmielod.mongodb.net/paytm");
const accountSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
module.exports=Account=mongoose.model('Account',accountSchema);