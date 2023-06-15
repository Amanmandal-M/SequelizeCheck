const express = require('express');
const { UserRegister, UserLogin } = require('../controllers/UserController');

const UserRouter = express.Router();

// Route for user registration
UserRouter.post("/register", UserRegister);

// Route for user login
UserRouter.post("/login", UserLogin);

module.exports = { UserRouter };
