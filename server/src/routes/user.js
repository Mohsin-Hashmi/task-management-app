
const express = require('express');
const usersRoutes= express.Router();
const {signUp, login, logout}= require("../controllers/user");
const {authMiddleware, adminMiddleware} = require('../middlewares/auth');
usersRoutes.post('/register', signUp )
usersRoutes.post('/login', login);
usersRoutes.post('/logout', logout);

module.exports = usersRoutes;