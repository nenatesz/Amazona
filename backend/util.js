const jwt = require("jsonwebtoken");
const config = require("./../config"); 

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '30d'
    })
    
} 

//  TO authencitate users and Admin


const isAuth = (req, res, next) => {
   const authorization = req.headers.authorization;
   if (authorization) {
       const token = authorization.slice(7, authorization.length) //Bearer xxxxx; the slice method on the authorization removes the bearer and leaves only the token
       // the verify method decrypts the token
       jwt.verify(token, config.JWT_SECRET, (err, decode) => {
           if (err){
               return res.status(401).send({msg: "Invalid Token"})
           }else{
            req.user = decode;
            next();
           }
       })
   }else{
     res.status(401).send({msg: "Token is not supplied."})
   }
   
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }else{
         res.status(401).send({msg: "Admin Token is not valid."})
    }   
}

module.exports = { generateToken, isAuth, isAdmin };