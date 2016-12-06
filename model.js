/*
	MealsDelivery Model

	Users(id, username, password, name, surname, bday, phone)
	Orders(id, lastupdate, delivery_date, user_id)
	Dishes(id, name, type, description, calorie, protein, carbohydrate, fiber, fat)
	Ingredients(id, name) 
	OrdersIngredients(order_id, dish_id)
	DishesIngredients(dish_id, ingredient_id, quantity)

*/

// the followings are all the data structures that will
// maintain the information reported above for the model
users = {};
users["prova"] = {password:"prova", birthday:"11/1/1111", phone:"111"};
orders = {};
dishes = {};
ingredients = {};
orders_ingredients = {};
dishes_ingredients = {};


// EXPORTS
exports.users = users;
exports.orders = orders;
exports.dishes = dishes;
exports.orders_ingredients = orders_ingredients;
exports.dishes_ingredients = dishes_ingredients;
