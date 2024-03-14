const app = require('express');
// const router = require('express').Router();
const { getAllCategories, createCategory } = require('../controllers/categoryController');


const router = app.Router();
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);

module.exports = router;