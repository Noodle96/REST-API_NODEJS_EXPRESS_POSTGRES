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