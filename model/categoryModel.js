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

const createCategoryModel = async (categoryName) => {
  try {
    const query = 'INSERT INTO category (category_name) VALUES (?)';
    const values = [categoryName];

    const result = await queryPromise(query, values);

  
    return result.insertId;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Database error');
  }
};


const getAllCategoriesModel = async () => {
  try {
    const query = 'SELECT * FROM category';
    const categories = await queryPromise(query);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Database error');
  }
};


const getCategoryByIdModel = async (categoryId) => {
  try {
    const query = 'SELECT * FROM category WHERE category_id = ?';
    const category = await queryPromise(query, [categoryId]);
    return category[0]; 
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Database error');
  }
};

const updateCategoryModel = async (categoryId, categoryName) => {
  try {
    const query = 'UPDATE category SET category_name = ? WHERE category_id = ?';
    const values = [categoryName, categoryId];


    const result = await queryPromise(query, values);
    return result;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Database error');
  }
};

const deleteCategoryModel = async (categoryId) => {
    try {
  
        const deleteQuery = 'DELETE FROM category WHERE category_id = ?';
        await queryPromise(deleteQuery, [categoryId]);
    
     
        const checkQuery = 'SELECT COUNT(*) AS count FROM category';
        const result = await queryPromise(checkQuery);
    
        const categoryCount = result[0].count;
    
      
        if (categoryCount === 0) {
          const resetAutoIncrementQuery = 'ALTER TABLE category AUTO_INCREMENT = 1';
          await queryPromise(resetAutoIncrementQuery);
          return { message: 'Category deleted, table is empty, auto-increment reset to 1' };
        }
    
        return { message: 'Category deleted, other categories still exist' };
      } catch (error) {
        console.error('Error deleting category or resetting auto-increment:', error);
        throw new Error('Database error');
      }
};


module.exports = {
  createCategoryModel,
  getAllCategoriesModel,
  getCategoryByIdModel,
  updateCategoryModel,
  deleteCategoryModel
};
