const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = (req, res, next) => {
  try {
    const Normal_Token = req.headers.authorization || "";

    if(Normal_Token){
      const Decoded =  jwt.verify(Normal_Token, process.env.NORMALKEY);
      
      if(Decoded){
          const UserId = Decoded.UserId;
          req.body.UserId = UserId;
          next();
      }else{
        res.status(404).send("Please Login Again");
      }
    }else{
        res.status(404).send("You are not Authorized Preson");
    }
  } catch (error) {
    res.status(400).send({
        Message : error.message
    })
  }
};

module.exports = {Authentication }