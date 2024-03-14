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
exports.createProduct = async (req, res) => {
	try{
		if(!req.body.name){ //  in this vvalidation => name="", enter here
			return res.status(422).json({error:"Name is required"});
		}
		if(!req.body.price){ //  in this vvalidation => name="", enter here
			return res.status(422).json({error:"Price is required"});
		}
		if(!req.body.category_id){ //  in this vvalidation => name="", enter here
			return res.status(422).json({error:"Category_id is required"});
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