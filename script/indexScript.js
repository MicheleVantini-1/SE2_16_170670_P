var mainKey;
var secondKey;
var sideKey;
var dessertKey;
var mainEditedKey;
var secondEditedKey;
var sideEditedKey;
var dessertEditedKey;


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
                            html += generateRadioButtons(obj, property, false);
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
                            // if it is the case we ereturn an error
                            document.getElementById("addOrderErrorContainer").innerHTML = errorPanel("Errore: " + obj.error);
                        }
                        else
                        {
                            newOrderShowHide();

                            // if everything is ok with the new order added we add
                            // it to the list of orders
                            var row = generateRow(obj.key, obj.date, obj.main, obj.second, obj.side, obj.dessert);

                            document.getElementById('date').value = "dd/mm/yyyy";
                            document.getElementById('ordersTableBody').innerHTML += row;
                            $('#confirmBtnContainer').hide();
                            $('#dishesContainer').hide();
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

function deleteOrder (order) {
    if(confirm("Sei sicuro di voler cancellare questo ordine?"))
    {
        // checking the validiy of the input
        if(parseInt(order) != NaN)
        {
            // if the input is valid we remove the order
            // via sending a request to the server

            // A new AXAJ request is created
            var xhttp = new XMLHttpRequest();
            // Setting the destination and the method for the request
            xhttp.open("POST", "/removeOrder", true);

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
                        document.getElementById("removeOrderErrorContainer").innerHTML = errorPanel('Errore: qualcosa è andato storto nella tua richiesta, riprova.');
                    } 
                    else 
                    {
                        var obj = JSON.parse(this.responseText);

                        // if the object received contains an error attribute
                        // it means that something goes wrong in the server-side
                        if(isNotUndefined(obj.error))
                        {
                            // if it is the case we ereturn an error
                            document.getElementById("removeOrderErrorContainer").innerHTML = errorPanel("Errore: " + obj.error);
                        }
                        else
                        {
                            // if everything is ok with the remove operation
                            // we remove the order also from the list of orders
                            $("#" + obj.key).remove();
                        }
                    }
                }
            };

            // sending the request to the server specifing the order
            // that has to be removed
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var data = "order=" + order;
            xhttp.send(data);
        }
        else
        {
            // if the input is invalid we show to the
            // user an error message
            document.getElementById("removeOrderErrorContainer").innerHTML = errorPanel('Errore: qualcosa è andato storto nella tua richiesta, riprova.');
        }
    }
}

function editOrder (order, date) {
    if(parseInt(order) != NaN)
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
                
                var modal = document.getElementById('editOrderModal');
                
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
                        html = '<div class="row" id="editOrder' + order + 'Container">';
                        for (var property in obj) 
                        {
                            if (obj.hasOwnProperty(property)) 
                            {
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
                                html += generateRadioButtons(obj, property, true);

                                html += "       </div>\
                                            </div>\
                                        </div>";
                            }
                        }    
                        html += "</div>";
                    }
                }

                modal.innerHTML = html;
                document.getElementById('editOrderModalFooter').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>'
                        + '<button type="button" class="btn btn-success" data-dismiss="modal" id="confirmEditBtn" onclick="confirmEdit(' + order + ", '" + date + '\');">Conferma Modifica</button>'; 
                //document.getElementById('confirmEditBtn').disabled = true;               
                //$('#editOrder' + order + "Container").slideDown();
            }
        };

        // sending the request to the server specifing that it contains
        // form inputs data
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("date=" + date);
    }
    else
    {
        document.getElementById(order).innerHTML += errorPanel("Errore: Ordine non valido");
    }
}

function confirmEdit(order, date)
{
    if(parseInt(order) != NaN)
    {
        // A new AXAJ request is created
        var xhttp = new XMLHttpRequest();
        // Setting the destination and the method for the request
        xhttp.open("POST", "/editOrder", true);

        // Now we set the callback function that will be triggered
        // due to the server answer receipt
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var obj = JSON.parse(this.responseText);
                var row = generateRow(obj.key, obj.date, obj.main, obj.second, obj.side, obj.dessert);
                document.getElementById(obj.key).innerHTML = row;
            }
        };

        // sending the request to the server specifing that it contains
        // form inputs data
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var data = "main=" + getRadioValue('editedmain')
               + "&" + "second=" + getRadioValue('editedsecond')
               + "&" + "side=" + getRadioValue('editedside')
               + "&" + "dessert=" + getRadioValue('editeddessert')
               + "&" + "date=" + date
               + "&" + "order=" + order;
        console.log(order);
        xhttp.send(data);
    }
    else
    {
        document.getElementById(order).innerHTML += errorPanel("Errore: Ordine non valido");
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
*   Function that given the type of the dish
*   and its key sets the proper local variable 
*   @param type - the type of the dish
*   @param key - the key of the dish
*/
function setEditedDish (type, key) {
    switch(type)
    {
        case 'main':
            mainEditedKey = parseInt(key);
            break;
        case 'second':
            secondEditedKey = parseInt(key);
            break;
        case 'side':
            sideEditedKey = parseInt(key);
            break;
        case 'dessert':
            dessertEditedKey = parseInt(key);
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

/*
*   Function that generates a an html row
*   that can be inserted in a table and that
*   represent an order
*   @param key - the key of the order
*   @param date - data of the order
*   @param main - main dish of the order
*   @param second - second dish of the order
*   @param side - side dish of the order
*   @param dessert - dessert of the order
    @return html row that represent the order
*/
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

/*
*   Function that generates a set of radio
*   button on the base of the data contained
*   in obj and property
*   @param obj - data to be modelled
*   @param property - data to be modelled
*   @param forEdit - boolean that indicates whether to put a label
*                    edited before some values
    @return html radio buttons as string
*/
function generateRadioButtons (obj, property, forEdit) {
    var html = "";
    var len = obj[property].length;
    for(var i = 0; i < len; i++)
    {
        var dish = obj[property][i];
        html+= '<div class="radio">\
                    <label>\
                        <input type="radio" '
                            + ' onclick="set' + ((forEdit)? "Edited" : "") + 'Dish(\'' + property + '\', ' + dish.key + ')" ' 
                            + ' name="' + ((forEdit)? "edited" : "") + property + '" ' 
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
                    + ' onclick="setEditedDish(\'' + property + '\', -1)" '
                    + ' name="' + ((forEdit)? "edited" : "") + property + '" value="-1" /> Non voglio questa portata'
            + '</label>'
            + '</div>';
    return html;
}