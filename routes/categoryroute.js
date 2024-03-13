const app = require('express');
// const router = require('express').Router();
const { getAllCategories } = require('../controllers/categoryController');


const router = app.Router();
router.get('/categories', getAllCategories);

module.exports = router;