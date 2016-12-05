/*
	MealsDelivery Database

	Users(id, username, password, name, surname, bday, phone)
	Orders(id, lastupdate, delivery_date, user_id)
	Dishes(id, name, type, description, calorie, protein, carbohydrate, fiber, fat)
	Ingredients(id, name) 
	OrdersIngredients(order_id, dish_id)
	DishesIngredients(dish_id, ingredient_id, quantity)

*/


CREATE TYPE course AS ENUM ('MAIN', 'SECOND', 'SIDE', 'DESSERT');

CREATE TABLE users
(
	id 			BIGSERIAL 	PRIMARY KEY
	, username 	TEXT 		NOT NULL UNIQUE
	, name 		TEXT 		NOT NULL
	, surname 	TEXT 		NOT NULL	
	, password 	TEXT 		NOT NULL
	, bday 		DATE 		NOT NULL
	, phone 	INTEGER 
);

CREATE TABLE orders
(
	id 				BIGSERIAL 	PRIMARY KEY
	, lastupdate 	TIMESTAMP 	NOT NULL
	, delivery_date DATE 		NOT NULL	
	, user_id 		BIGINT 		NOT NULL REFERENCES users(id)
);

CREATE TABLE dishes
(
	id 				BIGSERIAL 	PRIMARY KEY
	, name 			TEXT 		NOT NULL UNIQUE
	, description 	TEXT 		NOT NULL
	, type 			course 		NOT NULL
	, calorie 		INTEGER
	, protein 		INTEGER
	, carbohydrate 	INTEGER
	, fiber 		INTEGER
	, fat 			INTEGER
);

CREATE TABLE ingredients
(
	id 				BIGSERIAL 	PRIMARY KEY
	, name		 	TEXT 		NOT NULL UNIQUE
);

CREATE TABLE orders_ingredients
(
	order_id 		BIGINT REFERENCES orders(id)
	, dish_id 		BIGINT REFERENCES dishes(id)
	, PRIMARY KEY (order_id, dish_id)
);

CREATE TABLE dishes_ingredients
(
	dish_id 		BIGINT REFERENCES dishes(id)
	, ingredient_id BIGINT REFERENCES ingredients(id)
	, quantity 		INTEGER
	, PRIMARY KEY (dish_id, ingredient_id)
);
