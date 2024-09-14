
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/', productController.getProducts)
.get('/statistics',productController.getProductStatistics)
.get('/:id', productController.getProductsById)
.post('/', productController.postProduct)
.put('/:id', productController.updateProducts)
.delete('/:id', productController.deleteProducts)


module.exports = router;
