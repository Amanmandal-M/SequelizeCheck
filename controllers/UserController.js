const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

// -------------->>>> Model Location<<<<--------------
const { UserModel } = require("../models/UserModel");

// Controller function to register a new user
const UserRegister = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    const data = await UserModel.findOne({ where: { Email } });

    if (!data) {
      // Hash the password
      bcrypt.hash(Password, 5, async (error, hash) => {
        if (error) res.status(500).send("Internal Server Error");
        else {
          // Create a new user with the hashed password
          const UserData = await UserModel.create({
            Name,
            Email,
            Password: hash,
          });

          res.status(201).send({
            Message: "User registered successfully",
          });
        }
      });
    } else {
      res.status(409).send("User already registered");
    }
  } catch (error) {
    res.status(500).send({
      Message: error.message,
    });
  }
};

// Controller function to handle user login
const UserLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const data = await UserModel.findOne({ where: { Email } });

    const hashedPassword = data?.Password;

    if (data) {
      // Compare the entered password with the stored hashed password
      bcrypt.compare(Password, hashedPassword, (error, result) => {
        if (!result) res.status(401).send("Unauthorized");
        else {
          // Generate tokens
          const normalToken = jwt.sign(
            { UserId: data.id },
            process.env.NORMALKEY,
            { expiresIn: "7d" }
          );

          res.status(201).send({
            Message: "Login successful",
            Token: normalToken,
          });
        }
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send({
      Message: error.message,
    });
  }
};

module.exports = { UserRegister, UserLogin };
