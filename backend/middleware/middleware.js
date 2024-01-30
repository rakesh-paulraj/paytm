const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");


const middleware = (req, res, next) => {
    const authtoken = req.headers.authorization;

    if (!authtoken || !authtoken.startsWith('Bearer ')) {
        return res.status(403).json({
            message:"INVALID TOKEN"
        });
    }

    const token = authtoken.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userid = decoded.userid;

        next();
    } catch (err) {
        return res.status(403).json({message:"invalid password"});
    }
};

module.exports = {
    middleware
}