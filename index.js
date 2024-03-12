const express = require('express');
const {pool} = require('./services/database');

const app = express();
const port = 3000;

// 200: OK
// 500: Internal Server Error
app.get('/', (req, res) => res.send('Testing Node.js app'));
// app.get('/categories', (req, res) => res.send('Testing'));
app.get('/categories', (req, res) => {
	pool.query('SELECT * FROM category').then((result) => {
		return res.status(200).json(result.rows);
	}).catch(error => {
		return res.status(500).json({error:error.message});
	
	});
});

// console.log(process.env.DATABASE_URL);
app.listen(port, () =>  console.log(`Server is running on port ${port}`));