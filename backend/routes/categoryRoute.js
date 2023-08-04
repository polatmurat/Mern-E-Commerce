const express = require('express');
const router = express.Router();
const { categoryValidations } = require('../validations/categoryValidation');
const { createCategory, categories } = require('../controllers/categoryController');
const Authorization = require('../services/Authorization');

router.post("/create-category", [categoryValidations, Authorization.authorized], createCategory);
router.get('/categories/:page', Authorization.authorized, categories);
module.exports = router;