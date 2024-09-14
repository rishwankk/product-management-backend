const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,getCategoryWiseHighestPrice, getPriceRangeCount, getProductsWithoutMedia } = require('../model/productModel');
const bcrypt = require('bcryptjs');

const postProduct = async (req, res) => {
  try {
    const { SKU, product_name, category_id, material_ids, price } = req.body;
    console.log(req.body);
    

 
    if (!SKU || !product_name || !category_id || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

 
    const encryptedSKU = bcrypt.hashSync(SKU, 10);
  
    const newProductId = await createProduct({
      SKU: encryptedSKU,
      product_name,
      category_id,
      material_ids,
      price,
    });

    res.status(201).json({ product_id: newProductId, message: 'Product created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const getProducts = async (req, res) => {
    try {
      const filters = req.query; // Assuming filters are passed as query parameters
      const products = await getAllProducts(filters);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };
  
 
  const getProductsById = async (req, res) => {
    try {
      const product = await getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };
  

  const updateProducts = async (req, res) => {
    try {
      const { SKU, product_name, category_id, material_ids, price } = req.body;
  
  
      if (!SKU || !product_name || !category_id || !price) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const encryptedSKU = bcrypt.hashSync(SKU, 10);
  
      
      await updateProduct(req.params.id, {
        SKU: encryptedSKU,
        product_name,
        category_id,
        material_ids,
        price,
      });
  
      res.status(200).json({ message: 'Product updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  
 
  const deleteProducts = async (req, res) => {
    try {
      await deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };
  const getProductStatistics = async (req, res) => {
    try {
      
      const highestPriceByCategory = await getCategoryWiseHighestPrice();
      const priceRangeCount = await getPriceRangeCount();
      const productsWithoutMedia = await getProductsWithoutMedia();
  
      res.status(200).json({
        highestPriceByCategory,
        priceRangeCount,
        productsWithoutMedia
      });
    } catch (error) {
      console.error('Error fetching product statistics:', error);
      res.status(500).json({ error: 'Failed to fetch product statistics' });
    }
  };
  
  module.exports = {
    postProduct,
    getProducts,
    getProductsById,
    updateProducts,
    deleteProducts,
    getProductStatistics
  };
