const app = require('express');
// const router = require('express').Router();
const { getAllCategories,
		createCategory,
		updateCategory,
		deleteCategory, 
		getCategoryById} = require('../controllers/categoryController');


const router = app.Router();
router.get('/', getAllCategories);
router.get('/:id',getCategoryById)
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id',deleteCategory)

module.exports = router;