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

		var rows = "";

		for (var property in list) {
		    if (list.hasOwnProperty(property)) {
		    	var date = list[property]['date'];
				var key = parseInt(property);

				var main = (list[property]['main'] != -1) ? list[property]['main'] : "";
				var second = (list[property]['second'] != -1) ? list[property]['second'] : "";
				var side = (list[property]['side'] != -1) ? list[property]['side'] : "";
				var dessert = (list[property]['dessert'] != -1) ? list[property]['dessert'] : "";

				var mainName = (main !== "") ? dishes['main'][main].name : "";
				var secondName = (second !== "") ? dishes['second'][second].name : "";
				var sideName = (side !== "") ? dishes['side'][side].name : "";
				var dessertName = (dessert !== "") ? dishes['dessert'][dessert].name : "";

				var year = date.getFullYear();
				var month = ((date.getMonth() +1) > 9) ? (date.getMonth() +1) : ("0" + (date.getMonth() +1));
				var day = (date.getDate() > 9) ? date.getDate() : ("0" + date.getDate());
		    	var dateStr = year + "-" + month + "-" + day;
				rows += generateRow(property, dateStr , mainName, secondName, sideName, dessertName);/*'<tr id="' + property + '">';
				rows += '<td>' + dateStr + '</td>';
				rows += '<td>' + mainName + '</td>'
				rows += '<td>' + secondName + '</td>'
				rows += '<td>' + sideName + '</td>'
				rows += '<td>' + dessertName + '</td>'
	            rows += '<td><button class="btn btn-warning"  id="editBtn' + key + '" type="button" onclick="editOrder(' + property + ', \'' + dateStr +'\')">Modifica</button></td>';
				rows += '<td><button class="btn btn-danger" type="button" onclick="deleteOrder(' + key + ')">Elimina</button></td>';
	            rows += '</tr>';*/
		    }
		}

		res += rows;
	}

	return res;
}

function generateRow (key, date, main, second, side, dessert) {
    var row = '<tr id="' + key + '">';
    row += '<td>' + date + '</td>';
    row += '<td>' + main + '</td>';
    row += '<td>' + second + '</td>';
    row += '<td>' + side + '</td>';
    row += '<td>' + dessert + '</td>';
    row += '<td><button class="btn btn-warning" id="editBtn' + key + '" type="button" data-toggle="modal" data-target="#editModal" onclick="editOrder(' + key + ', \'' + date + '\')">Modifica</button></td>';
    row += '<td><button class="btn btn-danger" type="button" onclick="deleteOrder(' + key + ')">Elimina</button></td>';
    row += '</tr>';
    return row;
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
