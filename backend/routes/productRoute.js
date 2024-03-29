const express = require('express');
const router = new express.Router();
const Authorization = require('../services/Authorization');
const { productValidations } = require('../validations/productValidation');
const productController = require('../controllers/productController');
const { catProducts } = require('../controllers/homeProducts');
router.post('/create-product', [Authorization.authorized], productController.create);
router.get('/products/:page', [Authorization.authorized], productController.get);
router.get('/product/:id', [Authorization.authorized], productController.fetch);
router.put('/product', [Authorization.authorized, productValidations], productController.updateProduct);
router.delete('/delete-product/:id', [Authorization.authorized], productController.deleteProduct);
router.get('/category-products/:name/:page', catProducts)
module.exports = router;