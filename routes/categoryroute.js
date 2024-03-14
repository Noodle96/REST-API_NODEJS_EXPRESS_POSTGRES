const app = require('express');
// const router = require('express').Router();
const { getAllCategories, createCategory, updateCategory } = require('../controllers/categoryController');


const router = app.Router();
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);

module.exports = router;