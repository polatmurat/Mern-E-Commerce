const express = require('express');
const router = express.Router();
const { registerValidations } = require('../../validations/userValidation');
const register = require('../../controllers/user/userController');

router.post("/register", registerValidations, register);

module.exports = router;