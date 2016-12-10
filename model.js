var utility = require('./utility.js');
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

/*
*	Function that checks if a list of orders exists for
*	the username passed as parameter and returns html row
*	generated starting from that list
*	@param user - the username of a user
*	@return html rows as a string if the user exists and 
			he or she has done some order
			an empty string otherwise
*/
function generateRowsFromOrders (user) {
	var res = "";

	if(utility.isNotUndefined(orders[user]))
	{
		var list = orders[user];
		var len = list.length;

		if(len > 0)
		{
			res += "<tr>";
		}

		for(var i = 0; i < len; i++)
		{
			var date = list[i]['date'];
			
			var main = (list[i]['main'] != -1) ? list[i]['main'] : "";
			var second = (list[i]['second'] != -1) ? list[i]['second'] : "";
			var side = (list[i]['side'] != -1) ? list[i]['side'] : "";
			var dessert = (list[i]['dessert'] != -1) ? list[i]['dessert'] : "";

			var mainName = (main !== "") ? dishes['main'][main].name : "";
			var secondName = (second !== "") ? dishes['second'][second].name : "";
			var sideName = (side !== "") ? dishes['side'][side].name : "";
			var dessertName = (dessert !== "") ? dishes['dessert'][dessert].name : "";

			res += '<td>' + date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate() + '</td>'
			res += '<td>' + mainName + '</td>'
			res += '<td>' + secondName + '</td>'
			res += '<td>' + sideName + '</td>'
			res += '<td>' + dessertName + '</td>'
		}

		if(len > 0)
		{
			res += "</tr>";
		}
	}

	return res;
}


// EXPORTS
exports.users = users;
exports.orders = orders;
exports.dishes = dishes;
exports.availability = availability;
exports.orders_dishes = orders_dishes;
exports.dishes_ingredients = dishes_ingredients;
exports.course = course;
exports.generateRowsFromOrders = generateRowsFromOrders;
