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