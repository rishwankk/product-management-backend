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

const createProduct = async (productData) => {
  const { SKU, product_name, category_id, material_ids, price } = productData;
  const materialIdsString = Array.isArray(material_ids) ? material_ids.join(',') : '';

  try {
    const query = `INSERT INTO product (SKU, product_name, category_id, material_ids, price)
                   VALUES (?, ?, ?, ?, ?)`;
    const values = [SKU, product_name, category_id, materialIdsString, price];
    const result = await queryPromise(query, values);
    return result.insertId;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Database error');
  }
};

const getAllProducts = async (filters = {}) => {
  try {
    let query = 'SELECT * FROM product';
    const queryParams = [];

    if (filters.SKU) {
      query += ' WHERE SKU = ?';
      queryParams.push(filters.SKU);
    }
    if (filters.product_name) {
      query += queryParams.length ? ' AND product_name LIKE ?' : ' WHERE product_name LIKE ?';
      queryParams.push(`%${filters.product_name}%`);
    }
    if (filters.category_id) {
      query += queryParams.length ? ' AND category_id = ?' : ' WHERE category_id = ?';
      queryParams.push(filters.category_id);
    }
    if (filters.material_ids) {
      query += queryParams.length ? ' AND FIND_IN_SET(?, material_ids)' : ' WHERE FIND_IN_SET(?, material_ids)';
      queryParams.push(filters.material_ids);
    }
    if (filters.price_min && filters.price_max) {
      query += queryParams.length ? ' AND price BETWEEN ? AND ?' : ' WHERE price BETWEEN ? AND ?';
      queryParams.push(filters.price_min, filters.price_max);
    } else if (filters.price_min) {
      query += queryParams.length ? ' AND price >= ?' : ' WHERE price >= ?';
      queryParams.push(filters.price_min);
    } else if (filters.price_max) {
      query += queryParams.length ? ' AND price <= ?' : ' WHERE price <= ?';
      queryParams.push(filters.price_max);
    }

    const products = await queryPromise(query, queryParams);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Database error');
  }
};

const getProductById = async (productId) => {
  try {
    const query = 'SELECT * FROM product WHERE product_id = ?';
    const product = await queryPromise(query, [productId]);
    return product[0];
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Database error');
  }
};

const updateProduct = async (productId, productData) => {
  const { SKU, product_name, category_id, material_ids, price } = productData;

  try {
    const query = `UPDATE product SET SKU = ?, product_name = ?, category_id = ?, material_ids = ?, price = ? 
                   WHERE product_id = ?`;
    const values = [SKU, product_name, category_id, material_ids, price, productId];
    const result = await queryPromise(query, values);
    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Database error');
  }
};

const deleteProduct = async (productId) => {
  try {
    const deleteQuery = 'DELETE FROM product WHERE product_id = ?';
    await queryPromise(deleteQuery, [productId]);

    const checkQuery = 'SELECT COUNT(*) AS count FROM product';
    const result = await queryPromise(checkQuery);

    const productCount = result[0].count;

    if (productCount === 0) {
      const resetAutoIncrementQuery = 'ALTER TABLE product AUTO_INCREMENT = 1';
      await queryPromise(resetAutoIncrementQuery);
      return { message: 'Product deleted, table is empty, auto-increment reset to 1' };
    }

    return { message: 'Product deleted, other products still exist' };
  } catch (error) {
    console.error('Error deleting product or resetting auto-increment:', error);
    throw new Error('Database error');
  }
};

const getCategoryWiseHighestPrice = async () => {
  try {
    const query = `
      SELECT c.category_name, MAX(p.price) AS highest_price 
      FROM product p
      JOIN category c ON p.category_id = c.category_id
      GROUP BY c.category_name
    `;
    const result = await queryPromise(query);
    return result;
  } catch (error) {
    console.error('Error fetching highest price by category:', error);
    throw new Error('Database error');
  }
};

const getPriceRangeCount = async () => {
  try {
    const query = `
      SELECT 
        SUM(CASE WHEN price BETWEEN 0 AND 500 THEN 1 ELSE 0 END) AS '0-500',
        SUM(CASE WHEN price BETWEEN 501 AND 1000 THEN 1 ELSE 0 END) AS '501-1000',
        SUM(CASE WHEN price > 1000 THEN 1 ELSE 0 END) AS '1000+'
      FROM product
    `;
    const result = await queryPromise(query);
    return result[0];
  } catch (error) {
    console.error('Error fetching price range count:', error);
    throw new Error('Database error');
  }
};

const getProductsWithoutMedia = async () => {
  try {
    const query = `
      SELECT p.product_id, p.product_name 
      FROM product p
      LEFT JOIN product_media pm ON p.product_id = pm.product_id
      WHERE pm.product_id IS NULL
    `;
    const result = await queryPromise(query);
    return result;
  } catch (error) {
    console.error('Error fetching products without media:', error);
    throw new Error('Database error');
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsWithoutMedia,
  getPriceRangeCount,
  getCategoryWiseHighestPrice
};
