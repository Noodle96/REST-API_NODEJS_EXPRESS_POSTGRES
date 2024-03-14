UPDATE category
SET name='Food', update_date=CURRENT_TIMESTAMP
	WHERE id = 8
RETURNING *;