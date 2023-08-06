const express = require('express');
const router = express.Router();
const { categoryValidations } = require('../validations/categoryValidation');
const { createCategory, fetchCategory, categories } = require('../controllers/categoryController');
const Authorization = require('../services/Authorization');

router.post("/create-category", [categoryValidations, Authorization.authorized], createCategory);
router.get('/categories/:page', Authorization.authorized, categories);
router.get('/fetch-category/:id', Authorization.authorized, fetchCategory);
router.put('/update-category/:id', [categoryValidations, Authorization.authorized], updateCategory);
module.exports = router;