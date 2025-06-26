
const express = require('express');
const usersRoutes= express.Router();
const {signUp, login, logout}= require("../controllers/user");
usersRoutes.post('/register', signUp )
usersRoutes.post('/login', login);
usersRoutes.post('/logout', logout);

module.exports = usersRoutes;