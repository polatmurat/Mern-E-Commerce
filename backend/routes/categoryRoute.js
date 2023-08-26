const express = require('express');
const router = express.Router();
const { categoryValidations } = require('../validations/categoryValidation');
const { createCategory, fetchCategory, updateCategory, categories, deleteCategory, getAllCategories, randomCategories } = require('../controllers/categoryController');
const Authorization = require('../services/Authorization');

router.post("/create-category", [categoryValidations, Authorization.authorized], createCategory);
router.get('/categories/:page', Authorization.authorized, categories);
router.delete('/delete-category/:id', Authorization.authorized, deleteCategory);
router.get('/fetch-category/:id', Authorization.authorized, fetchCategory);
router.put('/update-category/:id', [categoryValidations, Authorization.authorized], updateCategory);
router.get('/all-categories', getAllCategories)
router.get('/random-categories', randomCategories)
module.exports = router;