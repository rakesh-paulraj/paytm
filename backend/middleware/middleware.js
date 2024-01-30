const JWT_SECRET =require("../config");
const jwt=require("jsonwebtoken");


function middleware(req,res,next){
    
    const authToken = req.headers.authorization; 
    if(authToken){
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token , JWT_SECRET);
        req.userid = decoded.userid;
        next();
    }else{
        res.status(403).json({msg: "Authentication failed"})
    }
}

    


module.exports={middleware}