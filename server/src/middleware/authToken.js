const jwt = require("jsonwebtoken")
const register = require("../models/Register.model")

// generates token
const tokenGen = async(userId) => {
 return jwt.sign({id:userId},process.env.JWT_KEY)
}

// verifies the token in request
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
// console.log(token);

    
    if (!token) {
      return res.status(404).json({Message : "You have to be logged in"});
    }
    const pureToken = token.split(" ")[1];
    try {
      let payload = jwt.verify(pureToken,process.env.JWT_KEY);
      // console.log("data : ",payload.id)
      
      let checkUser = await register.findOne({userId:payload.id})
      if(!checkUser){
          return res.status(404).json({message : "user not found"})
      }
      // console.log(checkUser.userId)
      req.userId = checkUser.userId;
      
      
      next();
      
    } catch (error) {
      res.json({message : `error : ${error}`})
      
    }
  };
  
module.exports = {
    tokenGen,verifyToken
}