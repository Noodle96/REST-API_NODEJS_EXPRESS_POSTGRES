const app = require('express');
// const router = require('express').Router();
const { getAllCategories,
		createCategory,
		updateCategory,
		deleteCategory } = require('../controllers/categoryController');


const router = app.Router();
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id',deleteCategory)

module.exports = router;