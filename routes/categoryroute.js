const app = require('express');
// const router = require('express').Router();
const { getAllCategories,
		createCategory,
		updateCategory,
		deleteCategory } = require('../controllers/categoryController');


const router = app.Router();
router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id',deleteCategory)

module.exports = router;