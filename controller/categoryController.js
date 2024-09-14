const {
    createCategoryModel,
    getAllCategoriesModel,
    getCategoryByIdModel,
    updateCategoryModel,
    deleteCategoryModel
  } = require('../model/categoryModel');
  

  const createCategory = async (req, res) => {
    try {
      const { category_name } = req.body;
  

      if (!category_name) {
        return res.status(400).json({ error: 'Category name is required' });
      }
  

      const newCategoryId = await createCategoryModel(category_name);
      res.status(201).json({ category_id: newCategoryId, message: 'Category created successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  };
  

  const getAllCategories = async (req, res) => {
    try {
      const categories = await getAllCategoriesModel();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  };

  const getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await getCategoryByIdModel(id);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  };
  

  const updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name } = req.body;
  
     
      if (!category_name) {
        return res.status(400).json({ error: 'Category name is required' });
      }
  
      const result = await updateCategoryModel(id, category_name);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  };
  
  
  const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      
      const result = await deleteCategoryModel(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  };
  
  module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
  };
  