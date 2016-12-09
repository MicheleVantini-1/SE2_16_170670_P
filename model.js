/*
	MealsDelivery Model

	Users(username, password, name, surname, bday, phone)
	Orders(lastupdate, delivery_date, user_id)
	Dishes(name, type, description, calorie, protein, carbohydrate, fiber, fat)
	Ingredients(name) 
	Availability(date, dish)
	OrdersDishes(order, dish)
	DishesIngredients(dish, ingredient, quantity)

*/

// the followings are all the data structures that will
// maintain the information reported above for the model
users = {};
orders = {};
course = {MAIN : 0, SECOND : 1, SIDE : 2, DESSERT : 3};
dishes = {main : [], second : [], side : [], dessert : []};
ingredients = {};
orders_dishes = {};
dishes_ingredients = {};
availability = {}


// EXPORTS
exports.users = users;
exports.orders = orders;
exports.dishes = dishes;
exports.availability = availability;
exports.orders_dishes = orders_dishes;
exports.dishes_ingredients = dishes_ingredients;
exports.course = course;
