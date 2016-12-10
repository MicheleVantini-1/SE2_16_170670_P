var mainKey;
var secondKey;
var sideKey;
var dessertKey;


/**
*	Function that manages the visibility of
*	the form that allows to create a new order
*/
function newOrderShowHide()
{
	$('#newOrderContainer').slideToggle(200);
    /*if($('#newOrderContainer').css('display') === 'none')
    {
        console.log("test");
        $('#showHideNewOrderBtn').html("Mostra ordine");        
    }
    else
    {
        console.log("test1");
        $('#showHideNewOrderBtn').html("Nascondi");            
    }*/
}

/**
*	Function that is triggered due to the confimation
*	of a date for a new meal. This function does a request 
*	to the server in order to get all the dishes that can
*	be selected for a new meal
*/
function selectDate () 
{
    // A new AXAJ request is created
	var xhttp = new XMLHttpRequest();
    // Setting the destination and the method for the request
	xhttp.open("POST", "/getDishes", true);

    // Now we set the callback function that will be triggered
    // due to the server answer receipt
	xhttp.onreadystatechange = function() 
	{
        if (this.readyState == 4 && this.status == 200) 
        {
            // parsing of the json object that is included
            // in the request
            var html;
            // if no answer is provided it means that there isn't
            // already a menu for the specified date
            if(this.responseText === "")
            {
                // so we return this error to the user
                html = errorPanel('Errore: menu non disponibile per quella data');
            } 
            else 
            {
                var obj = JSON.parse(this.responseText);
                // if the object received contains an error attribute
                // it means that something goes wrong in the server-side
                if(typeof obj.error !== 'undefined')
                {
                    // if it is the case we return the error received
                    html = errorPanel("Errore: "+ obj.error);
                }
                else
                {
                    // otherwise we fill a div with all the information received
                    html = "";

                    for (var property in obj) {
                        if (obj.hasOwnProperty(property)) {
                            html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">\
                                        <div class="panel panel-default dishes-container">\
                                            <div class="panel-body">';
                            switch(property){
                                case 'main':
                                    html += '<h4>Scegli un primo</h4>';
                                    break;
                                case 'second':
                                    html += '<h4>Scegli un secondo</h4>';
                                    break;
                                case 'side':
                                    html += '<h4>Scegli un contorno</h4>';
                                    break;
                                case 'dessert':
                                    html += '<h4>Scegli un dessert</h4>';
                                    break;
                            }

                            // loop that takes all the different dishes
                            // and produces a radio button list
                            var len = obj[property].length;
                            for(var i = 0; i < len; i++)
                            {
                                var dish = obj[property][i];
                                html+= '<div class="radio">\
                                            <label>\
                                                <input type="radio" '
                                                    + ' onclick="setDish(\'' + property + '\', ' + dish.key + ')" ' 
                                                    + ' name="' + property + '" ' 
                                                    + ' value="' + dish.key + '" /> ' 
                                                    + dish.name + ' (';

                                // Adding the list of ingredients
                                var ingredients = obj[property][i].ingredients;
                                var ingredientsLen = ingredients.length;
                                var j = 0;
                                for(; j < ingredientsLen -1; j++)
                                {
                                    html += ingredients[j].name + ", ";
                                }
                                html += ingredients[j].name;

                                // Closing all the opened tags
                                html += ')</label>\
                                        </div>';
                            }

                            html += '<div class="radio">'+
                                    + '<label>'
                                    + '<input type="radio" '
                                            + ' onclick="setDish(\'' + property + '\', -1)" '
                                            + ' name="' + property + '" value="-1" /> Non voglio questa portata'
                                    + '</label>'
                                    + '</div>';
                            html += "       </div>\
                                        </div>\
                                    </div>";
                        }
                    }    
                }
            }

            document.getElementById("dishesContainer").innerHTML = html;
            $('#dishesContainer').slideDown(200);
            $('#confirmBtnContainer').show();
       	}
    };

    // sending the request to the server specifing that it contains
    // form inputs data
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("date=" + document.getElementById('date').value);
}

/**
*   Function that is triggered due to the confimation
*   of a order. This function does a request to the server 
*   in order to add the new order
*/
function confirmOrder () 
{
    // If at least one of the dishes is selected we
    // send the request to the server
    if(isNotUndefined(mainKey) || isNotUndefined(secondKey) || isNotUndefined(sideKey) || isNotUndefined(dessertKey))
    {
        // and if at least one of them is different from -1
        // i.e. the user has specified at least one among main,second,side and dessert
        if(mainKey != -1 || secondKey != -1 || sideKey != -1 || dessertKey != -1)
        {
            // A new AXAJ request is created
            var xhttp = new XMLHttpRequest();
            // Setting the destination and the method for the request
            xhttp.open("POST", "/addOrder", true);

            // Now we set the callback function that will be triggered
            // due to the server answer receipt
            xhttp.onreadystatechange = function() 
            {
                if (this.readyState == 4 && this.status == 200) 
                {
                    // if the object received is empty
                    // it means that something goes wrong in the server-side
                    if(this.responseText === "")
                    {
                        // so we return this error to the user
                        document.getElementById("addOrderErrorContainer").innerHTML = errorPanel('Errore: qualcosa è andato storto nella tua richiesta, riprova.');
                    } 
                    else 
                    {
                        var obj = JSON.parse(this.responseText);

                        // if the object received contains an error attribute
                        // it means that something goes wrong in the server-side
                        if(isNotUndefined(obj.error))
                        {
                            // if it is the case w ereturn an error
                            document.getElementById("addOrderErrorContainer").innerHTML = errorPanel("Errore: " + obj.error);
                        }
                        else
                        {
                            newOrderShowHide();

                            // if everything is ok with the new order added we add
                            // it to the list of orders
                            var row = '<tr>';
                            row += '<td>' + obj.date + '</td>';
                            row += '<td>' + obj.main + '</td>';
                            row += '<td>' + obj.second + '</td>';
                            row += '<td>' + obj.side + '</td>';
                            row += '<td>' + obj.dessert + '</td>';
                            row += '</tr>';

                            document.getElementById('date').value = "dd/mm/yyyy";
                            document.getElementById('ordersTableBody').innerHTML += row;
                            $('#confirmBtnContainer').hide();
                        }
                    }
                }
            };
            // sending the request to the server specifing that it contains
            // form inputs data
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var data = "main=" + getRadioValue('main')
               + "&" + "second=" + getRadioValue('second')
               + "&" + "side=" + getRadioValue('side')
               + "&" + "dessert=" + getRadioValue('dessert')
               + "&" + "date=" + document.getElementById('date').value;
            xhttp.send(data);            
        }
        else
        {
            // otherwise we return an error message to the user
            document.getElementById("addOrderErrorContainer").innerHTML = errorPanel('Errore: Almeno uno piatto tra primi, secondi, contorni e dessert deve essere selezionato per poter fare un ordine') ;
        }
    }
    else
    {
        // otherwise we return an error message to the user
        document.getElementById("addOrderErrorContainer").innerHTML = errorPanel('Errore: Almeno uno piatto tra primi, secondi, contorni e dessert deve essere selezionato per poter fare un ordine') ;
    }
}

/*
*   Function that iterate over a radio button group
*   and returns the value of the selected one
*   @param - radioName the name of the radio group
*   @return the value of the selected radio button
            null if no one of the radio button is selected
*/
function getRadioValue (radioName) {
    var radios = document.getElementsByName(radioName);
    var length = radios.length;
    var res = null;
    var found = false;
    for (var i = 0; i < length; i++) {
        if (radios[i].checked) {
            res = radios[i].value;
            // only one radio can be checked
            // so we finish looking for it
            found = true;
            break;
        }
    }

    if(!found)
    {
        res = -1;
    }

    return res;
}


/*
*   Function that given the type of the dish
*   and its key sets the proper local variable 
*   @param type - the type of the dish
*   @param key - the key of the dish
*/
function setDish (type, key) {
    switch(type)
    {
        case 'main':
            mainKey = parseInt(key);
            break;
        case 'second':
            secondKey = parseInt(key);
            break;
        case 'side':
            sideKey = parseInt(key);
            break;
        case 'dessert':
            dessertKey = parseInt(key);
            break;
    }
}


/*
* Function that produces a panel
* to show an error message to the user
* @param text - the error message
* @return the error as bootstrap panel
*/
function errorPanel (text) {
    return '<div class="panel panel-warning">\
                <div class="panel-heading">'
                + text                    
               +'</div>\
            </div>';
}

/*
*   This function checks wether or not
*   the parameter field is undefined
*   @param field - the field to be checked
*   @return true if is not undefined
            false otherwise
*/
function isNotUndefined(field)
{
    return (typeof field !== 'undefined');
}