const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//Post request --> to register a user
router.post('/register', authController.singUp);

//Post request --> to login a user
router.post('/login', authController.singIn);
