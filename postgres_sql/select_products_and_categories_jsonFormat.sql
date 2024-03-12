-- TEMPLATE to INNER JOIN in json FORMAT
/*
	select p.any, p.any,
		   (select ROW_TO_JSON(obj) FROM (select * from category where id = p.category_id ) obj) as category
	from product as p 
*/

-- return the category as json format
SELECT p.id, p.name, p.description, p.price, p.currency,
		p.quantity, p.active, p.created_date, p.update_date,
		(SELECT ROW_TO_JSON(category_obj) FROM (
			SELECT id,name FROM category WHERE id = p.category_id
		) category_obj) AS category
	FROM product AS p;


-- Iner Join between product and category (all columns)
select p.*, c.* from product as p inner join category as c on c.id = p.category_id

-- test
select p.*, c.created_date, c.update_date from product as p inner join category as c on c.id = p.category_id
