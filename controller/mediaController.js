
const {
    createMediaModel,
    getMediaByProductIdModel,
    getProductsWithNoMediaModel
  } = require('../model/mediaModel');


const createMedia = async (req, res) => {
  try {
    const { product_id } = req.body;
    const { filename } = req.file;

 
    if (!product_id || !filename) {
        return res.status(400).json({ error: 'Product ID and image are required' });
      }
  
      
      const imageUrl = `/uploads/${filename}`;
  
      
      const newMediaId = await createMediaModel(product_id, imageUrl);
  
      res.status(201).json({ media_id: newMediaId, message: 'Media added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add media' });
    }
};

const getMediaByProductId = async (req, res) => {
  try {
    const media = await getMediaByProductIdModel(req.params.product_id);
    if (!media.length) {
      return res.status(404).json({ error: 'No media found for this product' });
    }
    res.status(200).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};


const getProductsWithNoMedia = async (req, res) => {
  try {
    const products = await getProductsWithNoMediaModel();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products with no media' });
  }
};

module.exports = {
  createMedia,
  getMediaByProductId,
  getProductsWithNoMedia,
};
