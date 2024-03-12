const express = require('express');
const {pool} = require('./services/database');

const app = express();
const port = 3000;

// 200: OK
// 500: Internal Server Error
app.get('/', (req, res) => res.send('Testing Node.js app'));
// app.get('/categories', (req, res) => res.send('Testing'));
// app.get('/categories', (req, res) => {
// 	pool.query('SELECT * FROM category').then((result) => {
// 		return res.status(200).json(result.rows);
// 	}).catch(error => {
// 		return res.status(500).json({error:error.message});
	
// 	});
// });
app.get('/categories', async (req, res) => {
	try{
		const result = await pool.query('SELECT * FROM category');
		return res.status(200).json(result.rows);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
});

app.get('/products',  (req, res) => {
	pool.query(`SELECT p.id, p.name, p.description, p.price, p.currency,
				p.quantity, p.active, p.created_date, p.update_date,
				(SELECT ROW_TO_JSON(category_obj) FROM (
					SELECT id, name FROM category WHERE id = p.category_id
				) category_obj) AS category
				FROM product AS p;`).then((result) => {
		return res.status(200).json(result.rows);
	}).catch(error => {
		return res.status(500).json({error:error.message});
	});
});
// console.log(process.env.DATABASE_URL);
app.listen(port, () =>  console.log(`Server is running on port ${port}`));