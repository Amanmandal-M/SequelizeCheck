const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('dotenv').config();

// -------------->>>> Model Location<<<<--------------
const { UserModel } = require("../models/UserModel")


const UserRegister = async (req,res) => {
    try {
        const {Name,Email,Password} = req.body;

        const data = await UserModel.findOne({where:{Email}});
        
        if(!data){
            bcrypt.hash(Password,5, async (error,hash) => {
                if(error) res.status(404).send("Not Authorized")
                else{
                    const UserData = await UserModel.create({
                        Name,
                        Email,
                        Password:hash
                    })

                    res.status(200).send({
                        "Response":"User Registered successfully"
                    })
                }
            })
        }else{
            res.status(404).send("User Already Registered")
        }


    } catch (error) {
        res.status(400).send({
            Message : error.message
        })
    }
}

const UserLogin = async (req,res) => {
    try {
        const {Email,Password} = req.body;

        const data = await UserModel.findOne({where:{Email}});

        const HashedPassword = data?.Password;

        if(data){
            bcrypt.compare(Password, HashedPassword , (error,result)=>{
                if(!result) res.status(404).send("Not Authorized")
                else{

                    // Generate Tokens
                    const Normal_Token = jwt.sign({ UserId: data.id }, process.env.NORMALKEY, { expiresIn: "7d" });

                    res.status(200).send({
                        "Message":"Login Successfully",
                        "Token": Normal_Token
                    })
                }
            })
        }else{
            res.status(404).send("User Not Found");
        }
        
    } catch (error) {
        res.status(400).send({
            Message : error.message
        })
    }
}

module.exports = { UserRegister , UserLogin}