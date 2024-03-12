INSERT INTO public.product(
	name, description, price, quantity, category_id)
	VALUES ('Televisor Smart TV','Smart description',599.90, 8,1) returning *;
