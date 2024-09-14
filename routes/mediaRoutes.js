
const express = require('express');
const router = express.Router();
const mediaController = require('../controller/mediaController');
const upload = require('../middleware/multer');


router.get('/:product_id', mediaController.getMediaByProductId)
.get('/no-media', mediaController.getProductsWithNoMedia)
.post('/upload', upload.single('media'), mediaController.createMedia);
module.exports = router;
