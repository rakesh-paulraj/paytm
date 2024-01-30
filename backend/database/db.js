const mongoose=require("mongoose");
const {Schema,model}=require ("mongoose");

mongoose.connect("mongodb+srv://admin:fQ8qLRJqWtSwH33G@cluster0.mmielod.mongodb.net/paytm");


const userschema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    secondname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})




module.exports=User=mongoose.model('User',userschema);

