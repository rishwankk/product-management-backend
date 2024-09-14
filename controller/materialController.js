
const {
    createMaterialModel,
    getAllMaterialsModel,
    updateMaterialModel,
    deleteMaterialModel
  } = require('../model/materialModel');


const createMaterial = async (req, res) => {
  try {
    const { material_name } = req.body;

    if (!material_name) {
      return res.status(400).json({ error: 'Material name is required' });
    }


    const newMaterialId = await createMaterialModel(material_name);
    res.status(201).json({ material_id: newMaterialId, message: 'Material created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create material' });
  }
};


const getAllMaterials = async (req, res) => {
  try {
    const materials = await getAllMaterialsModel();
    res.status(200).json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

const updateMaterial = async (req, res) => {
    try {
      const { material_name } = req.body;
      const { id } = req.params;
  
      if (!material_name) {
        return res.status(400).json({ error: 'Material name is required' });
      }
  
      await updateMaterialModel(id, material_name);
      res.status(200).json({ message: 'Material updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update material' });
    }
  };
  
  
  const deleteMaterial = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteMaterialModel(id);
      res.status(200).json({ message: 'Material deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete material' });
    }
  };
  
  module.exports = {
    createMaterial,
    getAllMaterials,
    updateMaterial,
    deleteMaterial,
  };