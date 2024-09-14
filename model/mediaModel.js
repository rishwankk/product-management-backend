const db = require('../config/db');

const queryPromise = (query, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const createMediaModel = async (productId, url) => {
  try {
    const query = 'INSERT INTO product_media (product_id, url) VALUES (?, ?)';
    const values = [productId, url];
    const result = await queryPromise(query, values);
    return result.insertId;
  } catch (error) {
    console.error('Error creating media:', error);
    throw new Error('Database error');
  }
};

const getMediaByProductIdModel = async (productId) => {
  try {
    const query = 'SELECT * FROM product_media WHERE product_id = ?';
    const media = await queryPromise(query, [productId]);
    return media;
  } catch (error) {
    console.error('Error fetching media by product ID:', error);
    throw new Error('Database error');
  }
};

const getProductsWithNoMediaModel = async () => {
  try {
    const query = `SELECT p.product_id, p.product_name 
                   FROM product p 
                   LEFT JOIN product_media m ON p.product_id = m.product_id 
                   WHERE m.product_id IS NULL`;
    const products = await queryPromise(query);
    return products;
  } catch (error) {
    console.error('Error fetching products with no media:', error);
    throw new Error('Database error');
  }
};

module.exports = {
  createMediaModel,
  getMediaByProductIdModel,
  getProductsWithNoMediaModel
};
