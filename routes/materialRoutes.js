
const express = require('express');
const router = express.Router();
const materialController = require('../controller/materialController');


router.get('/', materialController.getAllMaterials)
.post('/', materialController.createMaterial)
.put("/:id",materialController.updateMaterial)
.delete("/:id",materialController.deleteMaterial)

module.exports = router;
