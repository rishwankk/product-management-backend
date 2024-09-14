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


const createMaterialModel = async (materialName) => {
  try {
    const query = 'INSERT INTO material (material_name) VALUES (?)';
    const values = [materialName];

  
    const result = await queryPromise(query, values);

    return result.insertId;
  } catch (error) {
    console.error('Error creating material:', error);
    throw new Error('Database error');
  }
};

const getAllMaterialsModel = async () => {
  try {
    const query = 'SELECT * FROM material';
    const materials = await queryPromise(query);
    return materials;
  } catch (error) {
    console.error('Error fetching materials:', error);
    throw new Error('Database error');
  }
};

const updateMaterialModel = async (id, materialName) => {
    try {
      const query = 'UPDATE material SET material_name = ? WHERE material_id = ?';
      const values = [materialName, id];
      await queryPromise(query, values);
    } catch (error) {
      console.error('Error updating material:', error);
      throw new Error('Database error');
    }
  };
  

  const deleteMaterialModel = async (id) => {
    try {
      const query = 'DELETE FROM material WHERE material_id = ?';
      const values = [id];
      await queryPromise(query, values);
    } catch (error) {
      console.error('Error deleting material:', error);
      throw new Error('Database error');
    }
  };
module.exports = {
  createMaterialModel,
  getAllMaterialsModel,
  updateMaterialModel,
  deleteMaterialModel,
};
