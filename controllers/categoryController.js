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

// Aqui se tiene que validar 10 cosas:
// 1.- Que el id exista
// 2.- Que el name no exista ya que es un campo UNIQUE
// 3.- Que el name no sea nulo

// 200: OK
// 500: Internal Server Error
// 422: Unprocessable Entity
// 409: Conflict
// 404: Not Found
exports.updateCategory = async (req, res) => {
	try{
		// Validadando que el name no sea nulo
		if(!req.body.name){
			return res.status(422).json({error:"Name is required"});
		}else{
			// validando que el name no exista ya que es un campo UNIQUE
			const existResult = await pool.query({
				text: 'SELECT EXISTS (SELECT * FROM category WHERE name = $1);',
				values: [req.body.name],
			});
			//validate if category already exists
			if(existResult.rows[0].exists){
				return res.status(409).json({error:`Category ${req.body.name} already exists`});
			}
		}
		const result = await pool.query({
			text: `UPDATE category
				   SET name=$1, update_date=CURRENT_TIMESTAMP
				   WHERE id=$2
				   RETURNING *`,
			values: [req.body.name, req.params.id]
		});
		//validando que el id exista
		if(result.rowCount == 0){
			return res.status(404).json({error:`Category with id ${req.params.id} not found`});
		}
		return res.status(200).json(result.rows[0]);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}

// Se tiene que validar:
// 1.- Que el id exista
// 2.- Que no tenga productos asociados

//404: Not Found
//204: No Content
// 409: Conflict
exports.deleteCategory = async (req, res) => {
	try{
		// validando [2]
		const countResult = await pool.query({
			text: 'SELECT COUNT(*) FROM product WHERE category_id = $1;',
			values: [req.params.id]
		});
		if(countResult.rows[0].count > 0){
			return res.status(409).json({error:`Category with id ${req.params.id} has associated ${countResult.rows[0].count} products`});
		}
		// [2]
		const result = await pool.query({
			text: 'DELETE FROM category WHERE id=$1 RETURNING *',
			values: [req.params.id]
		});
		// Validando [1]
		if(result.rowCount == 0){
			return res.status(404).json({error:`Category with id ${req.params.id} not found`});
		}
		// [1]
		return res.status(204).send();
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}
//validar
// 1.- que el id exista
exports.getCategoryById = async (req, res) => {
	try{
		const result = await pool.query({
			text: 'SELECT * FROM category WHERE id = $1',
			values: [req.params.id]
		});
		// validando [1]
		if(result.rowCount == 0){
			return res.status(404).json({error:`Category with id ${req.params.id} not found`});
		}
		// [1]
		return res.status(200).json(result.rows[0]);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}