const express = require('express');
const { UserRegister , UserLogin } = require('../controllers/UserController')

const UserRouter = express.Router();

UserRouter.post("/register" , UserRegister);

UserRouter.post("/login" , UserLogin);


module.exports = { UserRouter };