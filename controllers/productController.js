const { pool } = require("../services/database");

// 200: OK
// 500: Internal Server Error
exports.getAllProducts = (req, res) => {
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
}

//422: Unprocessable Entity
// De aqui se tiene que validar que todos los campos excepto la descripcion no sean nulos
exports.createProduct = async (req, res) => {
	try{
		if(!req.body.name){ //  in this vvalidation => name="", enter here
			return res.status(422).json({error:"Name is required"});
		}
		if(!req.body.price){
			return res.status(422).json({error:"Price is required"});
		}
		if(!req.body.category_id){
			return res.status(422).json({error:"Category_id is required"});
		}else{
			const existCategory = await pool.query({
				text: 'SELECT EXISTS (SELECT * FROM category WHERE id = $1);',
				values: [req.body.category_id],
			});
			if(!existCategory.rows[0].exists){
				return res.status(422).json({error:"Category_id does not found"});
			}
		}
		// con estas restricciones solo faltaria validar name, price, and category_id
		const result = await pool.query({
			text: `INSERT INTO product(name, description, price, currency, quantity, active, category_id)
				   VALUES ($1, $2, $3, $4, $5, $6, $7)
				   RETURNING *;`,
			values: [
				req.body.name,
				req.body.description ? req.body.description : null,
				req.body.price,
				req.body.currency ? req.body.currency : 'USD',
				req.body.quantity ? req.body.quantity : 0,
				'active' in req.body ? req.body.active : true,
				req.body.category_id
			]
		});
		return res.status(201).json(result.rows[0]);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}

// Se tiene que validar los siguietntes items
// 1.- Que el id exista
// 2.- Que todos los campos son obligatorios
// 3.- Que el id de la categoria exista
exports.updateProduct = async (req, res) => {
	try{
		// validando [2]
		if(!req.body.name || !req.body.description || !req.body.price || !req.body.currency || !req.body.quantity || !req.body.active || !req.body.category_id){
			return res.status(422).json({error:"All fields are required"});
		}
		//vaidando [3]
		const existCategory = await pool.query({
			text: 'SELECT EXISTS (SELECT * FROM category WHERE id = $1);',
			values: [req.body.category_id],
		});
		if(!existCategory.rows[0].exists){
			return res.status(422).json({error:"Category_id does not found"});
		}
		const result = await pool.query({
			text: `UPDATE product
				   SET name=$1, description=$2, price=$3, currency=$4, quantity=$5, active=$6, category_id=$7, update_date=CURRENT_TIMESTAMP
				   WHERE id=$8
				   RETURNING *`,
			values: [
				req.body.name,
				req.body.description,
				req.body.price,
				req.body.currency,
				req.body.quantity,
				req.body.active,
				req.body.category_id,
				req.params.id
			]
		});
		//validando[1]
		if(result.rowCount == 0){
			return res.status(404).json({error:`Product with id ${req.params.id} not found`});
		}
		return res.status(200).json(result.rows[0]);
	}catch(error){
		return res.status(500).json({error:error.message});
	}
}