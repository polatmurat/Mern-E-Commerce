const express = require('express');
const router = express.Router();
const { loginValidations, registerValidations } = require('../../validations/userValidation');
const {register, login} = require('../../controllers/user/userController');
 
router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);

module.exports = router;