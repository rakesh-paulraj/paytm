const JWT_SECRET =require("../config");
const jwt=require("jsonwebtoken");


function middleware(req,res,next){
    const authmiddlware=req.headers.authorization;
    if(!authmiddlware || !authmiddlware.startsWith('Bearer ')){
        res.status(303).json({})

    }
    const token=authmiddlware.split('')[1];
try{
    const decoded=jwt.verify(token,JWT_SECRET);
    req.userid=decoded.userid;
    next();
}
catch{
    return res.status(403).json({});
}
};

module.exports={middleware}