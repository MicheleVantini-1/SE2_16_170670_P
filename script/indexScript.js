/**
*	Function that manages the visibility of
*	the form that allows to create a new order
*/
function newOrderShowHide()
{
	$('#newOrderContainer').slideToggle(200);
}

/**
*	Function that is triggered due to the confimation
*	of a date for a new meal. This function does a request 
*	to the server in order to get all the dishes that can
*	be selected for a new meal
*/
function selectDate () 
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/getDishes", true);

	xhttp.onreadystatechange = function() 
	{
        if (this.readyState == 4 && this.status == 200) 
        {
        	var obj = JSON.parse(this.responseText);
            var html = "";
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    html += '<div class="' + property + 'DishesContainer">\
                            <h4>Scegli un primo</h4>'
                    var mainLen = obj[property].length;
                    for(var i = 0; i < mainLen; i++)
                    {
                        html+= '<input type="radio" name="' + property + '" value="' + obj[property][i] + '" />' + obj[property][i].name + ' (';
                        var ingredientsLen = obj[property][i].ingredients.length;
                        var j = 0;
                        for(; j < ingredientsLen -1; j++)
                        {
                            html += obj[property][i].ingredients[j].name + ", ";
                        }
                        html += obj[property][i].ingredients[j].name;
                        html += ')<br/>';
                    }
                }
            }

        	/*
            html += '<button onclick="selectMainDish();" type="button">Prosegui</button>\
                    </div>\
                    <div class="secondDishesContainer">\
                        <h4>Scegli un second</h4>';
            var secondLen = obj.second.length;
            for(var i = 0; i < secondLen; i++)
            {
                html+= '<input type="radio" name="second" value="' + obj.second[i] + '" />' + obj.second[i].name + ' (';
                var ingredientsLen = obj.second[i].ingredients.length;
                var j = 0;
                for(; j < ingredientsLen -1; j++)
                {
                    html += obj.second[i].ingredients[j].name + ", ";
                }
                html += obj.second[i].ingredients[j].name;
                html += ')<br/>';
            }
            html += '<button onclick="selectSecondDish();" type="button">Prosegui</button>\
                    </div>\
                    <div class="sideDishesContainer">\
                        <h4>Scegli un contorno</h4>';
            var sideLen = obj.side.length;
            for(var i = 0; i < sideLen; i++)
            {
                html+= '<input type="radio" name="side" value="' + obj.side[i] + '" />' + obj.side[i].name + ' (';
                var ingredientsLen = obj.side[i].ingredients.length;
                var j = 0;
                for(; j < ingredientsLen -1; j++)
                {
                    html += obj.side[i].ingredients[j].name + ", ";
                }
                html += obj.side[i].ingredients[j].name;
                html += ')<br/>';
            }
            html += '<button onclick="selectSideDish();" type="button">Prosegui</button>\
                    </div>\
                    <div class="dessertDishesContainer">\
                        <h4>Scegli un dessert</h4>';
            var dessertLen = obj.dessert.length;
            for(var i = 0; i < dessertLen; i++)
            {
                html+= '<input type="radio" name="dessert" value="' + obj.dessert[i] + '" />' + obj.dessert[i].name + ' (';
                var ingredientsLen = obj.dessert[i].ingredients.length;
                var j = 0;
                for(; j < ingredientsLen -1; j++)
                {
                    html += obj.dessert[i].ingredients[j].name + ", ";
                }
                html += obj.dessert[i].ingredients[j].name;
                html += ')<br/>';
            }
            html += '<button onclick="selectDessert();" type="button">Prosegui</button>\
                    </div>';       	
*/
            document.getElementById("dishesContainer").innerHTML = html;
       	}
    };

	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("date=" + document.getElementById('date').value);
}