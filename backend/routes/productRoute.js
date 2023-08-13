const express = require('express');
const router = new express.Router();
const Authorization = require('../services/Authorization');
const { productValidations } = require('../validations/productValidation');
const productController = require('../controllers/productController');
router.post('/create-product', [Authorization.authorized], productController.create);
module.exports = router;