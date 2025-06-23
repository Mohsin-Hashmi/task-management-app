
const express = require('express');
const usersRoutes= express.Router();
const {signUp, login}= require("../controllers/user");
usersRoutes.post('/register', signUp )
usersRoutes.post('/login', login);

module.exports = usersRoutes;