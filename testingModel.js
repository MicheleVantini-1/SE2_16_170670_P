var model = require('./model.js');

// TESTING MODULE

/*
* Function that randomly fill the data
* structures that compose the model
* for the web application testing
*/
function populateModel () 
{
	var user = "prova";
	var password = "prova";

	/* testing user */
	users[user] = {password: password, birthday:"11/1/1111", phone:"111"};

	/* testing dishes */
	var count = 20;
	for(var i = 0; i < count; i++)
	{
		dishes['main'][i] = {
				key : i
				, name : "main" + i
				, description : "descrizione" + i
				, calorie : parseInt(Math.random()*1000)
				, protein : parseInt(Math.random()*100)
				, carbohydrate : parseInt(Math.random()*100)
				, fiber : parseInt(Math.random()*100)
				, fat : parseInt(Math.random()*100)
				, ingredients : []
		};	

		dishes['second'][i] = {		
				key : i
				, name : "second" + i
				, description : "descrizione" + i
				, calorie : parseInt(Math.random()*1000)
				, protein : parseInt(Math.random()*100)
				, carbohydrate : parseInt(Math.random()*100)
				, fiber : parseInt(Math.random()*100)
				, fat : parseInt(Math.random()*100)
				, ingredients : []
		};	

		dishes['side'][i] = {
				key : i
				, name : "side" + i
				, description : "descrizione" + i
				, calorie : parseInt(Math.random()*1000)
				, protein : parseInt(Math.random()*100)
				, carbohydrate : parseInt(Math.random()*100)
				, fiber : parseInt(Math.random()*100)
				, fat : parseInt(Math.random()*100)
				, ingredients : []
		};	
		
		dishes['dessert'][i] = {
				key : i
				, name : "dessert" + i
				, description : "descrizione" + i
				, calorie : parseInt(Math.random()*1000)
				, protein : parseInt(Math.random()*100)
				, carbohydrate : parseInt(Math.random()*100)
				, fiber : parseInt(Math.random()*100)
				, fat : parseInt(Math.random()*100)
				, ingredients : []
		};
	}

	/* testing ingredients */
	for(var i = 0; i < count; i++)
	{
		ingredients[i] = {name : "ingrediente" + i};
	}

	/* testing dishes_ingredients */
	for(var i = 0; i < 20; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			dishes['main'][i].ingredients.push({name : "ingrediente" + parseInt(Math.random()*count), quantity : parseInt(Math.random()*100)});
			dishes['second'][i].ingredients.push({name : "ingrediente" + parseInt(Math.random()*count), quantity : parseInt(Math.random()*100)});
			dishes['side'][i].ingredients.push({name : "ingrediente" + parseInt(Math.random()*count), quantity : parseInt(Math.random()*100)});
			dishes['dessert'][i].ingredients.push({name : "ingrediente" + parseInt(Math.random()*count), quantity : parseInt(Math.random()*100)});
		}
	}

	/* testing availability */
	for(var i = 1; i <=31; i++)
	{
		var date = "2017-01-" + ((i < 10)? '0' + i : i);
		availability[date] = {main: [], second : [], side : [], dessert : []};
		
		for(var j = 0; j < 3; j++)
		{
			availability[date].main.push(dishes.main[parseInt(Math.random()*count)]); 
			availability[date].second.push(dishes.second[parseInt(Math.random()*count)]); 
			availability[date].side.push(dishes.side[parseInt(Math.random()*count)]); 
			availability[date].dessert.push(dishes.dessert[parseInt(Math.random()*count)]); 
		}
	}

	//console.log(availability['2017-01-01']);

	/* testing order */
	orders[user] = {};

	for(var i = 1; i <=10; i++)
	{
		var date = "2017-01-" + ((i < 10)? '0' + i : i);
		
		for(var j = 0; j < 2; j++)
		{
			var mainId = availability[date].main[j];
			var secondId = availability[date].second[j];
			var sideId = availability[date].side[j];
			var dessertId = availability[date].dessert[j];

			orders[user][j] = {
				date : date
				, main : mainId
				, second : secondId
				, side : sideId
				, dessert : dessertId
			};
		}
	}
}


// EXPORTS
exports.populateModel = populateModel;