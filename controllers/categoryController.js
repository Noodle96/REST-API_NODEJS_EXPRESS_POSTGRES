const { pool } = require("../services/database");

// 200: OK
// 500: Internal Server Error

// app.get('/categories', (req, res) => {
// 	pool.query('SELECT * FROM category').then((result) => {
// 		return res.status(200).json(result.rows);
// 	}).catch(error => {
// 		return res.status(500).json({error:error.message});
	
// 	});
// });

// exports.getAllCategories =  (req, res) => {
// 	pool.query('SELECT * FROM category').then((result) => {
// 		return res.status(200).json(result.rows);
// 	}).catch(error => {
// 		return res.status(500).json({error:error.message});
	
// 	});
// };

exports.getAllCategories = async (req, res) => {
	try{
		const result = await pool.query('SELECT * FROM category');
		return res.status(200).json(result.rows);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}
//201: Created
//422: Unprocessable Entity
//409: Conflict
exports.createCategory = async (req, res) => {
	try{
		if(!req.body.name) return res.status(422).json({error:"Name is required"});
		const existResult = await pool.query({
			text: 'SELECT EXISTS (SELECT * FROM category WHERE name = $1);',
			values: [req.body.name],
		});
		//validate if category already exists
		if(existResult.rows[0].exists) return res.status(409).json({error:`Category ${req.body.name} already exists`});
		const result = await pool.query({
			text: 'INSERT INTO category (name) VALUES ($1) RETURNING *',
			values: [req.body.name]
		});
		return res.status(201).json(result.rows[0]);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}