// MODULES IMPORTS
var express = require('express');
var bodyParser = require('body-parser');
var bind = require('bind');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var serverConfig = require('./serverConfig.js');
var user = require('./login.js');
var bindWrapper = require('./bindWrapper.js');
var model = require('./model.js');
var testingModel = require('./testingModel.js');
var html = require('./html.js');
var utility = require('./utility.js');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));    // to support URL-encoded bodies

// initializing express session
app.use(session(
		{
			secret : 'session'
			, resave: true
			, saveUninitialized: true
		}
	)
);

/*
	THIS IS ONLY FOR TESTING PURPOSE
*/
testingModel.populateModel();


app.set("port", (process.env.PORT || serverConfig.port));

// with the following we allow the access to static contents
// that are in the script folder but via another name, in this
// case 'scripts'
app.use("/scripts", express.static(__dirname + "/script"));

// with the following we allow the access to static contents
// that are in the css folder but via another name, in this
// case 'style'
app.use("/style", express.static(__dirname + "/css"));

// with the followings we allow the access to static contents
// that are in the boostrap folder but via another name, in this
// case 'bootstrapCss' and 'bootstrapJs'
app.use("/bootstrapCss", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/bootstrapJs", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

app.get("/"
	, function (request, response)
	  {
	  	// Getting the session
	  	var sess = request.session;
	  	// We have to check the credentials of the user
	  	if(user.isUserLogged(request))
	  	{
	  		// if the user is logged we produce an html document from
		  	// a template that is the home page
		  	var orders = model.generateRowsFromOrders(sess.user);
		  	bind.toFile(
				'tpl/index.tpl'
				, {
		    		header : html.header
		    		, js : html.js
		    		, user : sess.user
		    		, orders : orders
		    		, navbar : html.navbar
		    		, base : serverConfig.completeUrl
		    	  }
				, function (data)
				  {				
					var headers = serverConfig.headers;
				  	headers["Content-Type"] = "text/html";
					response.writeHead(200, headers);
					response.end(data);
				  }
			);

	  	}
	  	else
	  	{
	  		response.redirect("/login");
	  		response.end();
	  	}
	  }
);

// accepting all the get request of the form http://localhost:port/
// and setting the proper callback function
app.get("/login"
	, function (request, response)
	  {
	  	// in this case we produce an html document from
	  	// a template but we leave all the parameters empty
	  	// because the user is requesting the home page
	    bind.toFile(
			"tpl/login.tpl"
			, {
				header : html.header
				, js : html.js
				, action : 'action="' + serverConfig.completeUrl + "/doLogin" + '"'
			  }
			, function (data)
			  {				
				var headers = serverConfig.headers;
			  	headers["Content-Type"] = "text/html";
				response.writeHead(200, headers);
				response.end(data);
			  }
		);
	  	
	  }
);

// accepting all the get request of the form http://localhost:port/
// and setting the proper callback function
app.get("/register"
	, function (request, response)
	  {
	  	// in this case we produce an html document from
	  	// a template but we leave all the parameters empty
	  	// because the user is requesting the home page
	    bind.toFile(
			"tpl/register.tpl"
			, {
				header : html.header
				, js : html.js
				, action : 'action="' + serverConfig.completeUrl + "/doRegister" + '"'
			  }
			, function (data)
			  {				
			  	var headers = serverConfig.headers;
			  	headers["Content-Type"] = "text/html";
				response.writeHead(200, headers);
				response.end(data);
			  }
		);
	  	
	  }
);

// the following set a callback function that does
// the login phase 
app.post("/doLogin"
	, function (request, response)
	  {
	  	// if sth goes wrong this variable is set to true 
	  	// so that the user will be redirected to the login page
	  	var redirect = false;

		var username;
	  	var password;
	  	// if a body is prensent in the request and is not empty
	  	if( typeof request.body !== 'undefined' && request.body)
	    {	  		
	    	// if username parameter is prensent in the request
	    	// we process it
	    	if( typeof request.body.username !== 'undefined')
		    {

		    	if(!request.body.username)
		    	{
		    		redirect = true;
		    	}
		    	else
		    	{
		    		username = request.body.username;

		    		// if password parameter is prensent in the request
	    			// we process it
		    		if( typeof request.body.password !== 'undefined')
				    {
				    	if(!request.body.password)
				    	{
				    		redirect = true;
				    	}
				    	else
				    	{
				    		password = request.body.password;
				    		// executing the login function to check if the input data
				    		// represent a valid user
				    		var logged = user.login(username, password);
				    		if(logged)
				    		{
				    			// Getting the session
	  							var sess = request.session;
				    			sess.user = username;
				    			response.redirect("/");
				    			response.end();
				    		}
				    		else
				    		{
				    			redirect = true;
				    		}
				    	}
				    }	
		    	}
		    }
		    else
		    {
		    	redirect = true;
		    }
	    }
	    else
	    {
	    	redirect = true;
	    }

	    if(redirect)
	    {
	    	response.redirect("/login");
			response.end();
	    }
	  }

);

// the following set a callback function that does
// the login phase 
app.post("/doRegister"
	, function (request, response)
	  {
	  	// if sth goes wrong this variable is set to true 
	  	// so that the user will be redirected to the login page
	  	var redirect = false;

		var username;
	  	var password;
	  	var repassword;
	  	var email;
	  	var birthday;
	  	var phone;
	  	// if a body is prensent in the request and is not empty	  	
	  	if( typeof request.body !== 'undefined' && request.body)
	    {	  		
	    	// if username parameter is prensent in the request
	    	// we process it
	    	if( typeof request.body.username !== 'undefined')
		    {
		    	if(!request.body.username)
		    	{
		    		console.log("no username");
		    		redirect = true;
		    	}
		    	else
		    	{
		    		username = request.body.username;

		    		// if password parameter is prensent in the request
	    			// we process it
		    		if( typeof request.body.password !== 'undefined')
				    {
				    	if(!request.body.password)
				    	{
				    		console.log("no password");
				    		redirect = true;
				    	}
				    	else
				    	{
				    		password = request.body.password;

				    		if( typeof request.body.repassword !== 'undefined')
						    {
						    	if(!request.body.repassword)
						    	{
						    		console.log("no repassword");
						    		redirect = true;
						    	}
						    	else
						    	{
						    		repassword = request.body.repassword;
						    		if(password === repassword)
						    		{
						    			if( typeof request.body.birthday !== 'undefined')
									    {
									    	if(!request.body.birthday)
									    	{
									    		console.log("no birthday");
									    		redirect = true;
									    	}
									    	else
									    	{
									    		birthday = request.body.birthday;
									    		if( typeof request.body.phone !== 'undefined')
											    {
											    	if(request.body.phone)
											    	{
											    		phone = request.body.phone;
											    	}
											    	else
											    	{
											    		console.log("no phone");
											    		phone = null;
											    	}
											    }

											    var res = user.register(username, password, birthday, phone);
											    if(!res)
											    {
											    	console.log("the user already exists");
											    	redirect = true;
											    }
									    	}
									    }
						    		}
						    		else
						    		{
						    			console.log("the 2 psw don't match");
						    			redirect = true;
						    		}
						    	}
						    }
				    	}
				    }	
		    	}
		    }
		    else
		    {		    
		    	redirect = true;
		    }
	    }
	    else
	    {
	    	redirect = true;
	    }

	    if(redirect)
	    {
	    	response.redirect("/register");
			response.end();
	    }
	    else
	    {
	    	response.redirect("/login");
	    	response.end();
	    }
	  }

);

// the following set a callback function that does
// the logout phase 
app.get("/logout"
	, function (request, response)
	  {
	  	// in order to logout the user we destroy the
	  	// session and we provide a callback function that
	  	// if there is no error redirects the user to the 
	  	// login page, otherwise we redirect the user to an error page
	  	request.session.destroy(
	  		function(err) 
	  		{
				if(!err) 
				{
					response.redirect('/login');
					response.end();
				}
				else
				{
					response.redirect('/error');
					response.end();
				}
			}
		);
	  }
);

/*
*	The following sets the callback function that
*	answer to POST request of the form http://wesite.com/getDishes
*	with a JSON object that contains all the dishes for a
*	specified date (that must be part of the POST request)
*/
app.post("/getDishes"
	, function (request, response)
	  {
	  	// at first we have to check if the user is logged in
	  	if(user.isUserLogged(request))
	  	{
		  	var headers = serverConfig.headers;
		  	headers["Content-Type"] = "application/json";
		  	var obj;	  	
		  	var responseCode = 200;
		  	
		  	// checking that the date field is present and not empty
		  	// in the body of the request
	  		if(utility.isNotUndefined(request.body.date) && request.body.date)
		  	{
		  		if(utility.checkDate(request.body.date))
		  		{
		  			var date = new Date(request.body.date);
			  		date.setHours(1,0,0,0);

			  		var now = new Date(Date.now());
			  		now.setHours(1,0,0,0);
			  		// checking that the date is after today
			  		if(date >= now)
			  		{
			  			// if it is the case we return 
			  			// the information about the dishes		
			  			obj = model.availability[request.body.date];
			  		}
			  		else
			  		{
			  			// otherwise we return an error message
			  			obj = {error : "La data deve essere successiva a quella attuale"}
			  			// setting the response code to 406 - NOT ACCEPTABLE
			  			responseCode = 406;
			  		}	
		  		}
		  		else
		  		{
		  			obj = {error : "La data passata è in un formato non valido"}
		  			// setting the response code to 406 - NOT ACCEPTABLE
			  		responseCode = 406;
		  		}
		  		
		  	}
		  	else
		  	{
		  		// if there is no date in the body of the request or it is empty
		  		// we return an error message
		  		obj = {error : "Deve essere fornita una data per poter accedere al menu"};
		  		// setting the response code to 406 - NOT ACCEPTABLE
			  	responseCode = 406;
		  	}
	  		
	  		// conversion of the Javascript object to a JSON object
		  	var json = JSON.stringify(
			  	obj
			);

			response.writeHead(responseCode, headers);
		  	response.end(json);	
		  		  		
	  	}
	  	else
	  	{
	  		response.redirect("/login");
	  		response.end();
	  	}  
	  }
);


/*
*	The following sets the callback function that
*	answer to POST request of the form http://wesite.com/addOrder
*	with a JSON object that contains the confimation of the order
*/
app.post("/addOrder"
	, function (request, response)
	  {
	  	// at first we have to check if the user is logged in
	  	if(user.isUserLogged(request))
	  	{
		  	var headers = serverConfig.headers;
		  	headers["Content-Type"] = "application/json";
		  	var responseCode = 200;
		  	var obj;	  			  	
		  	
		  	// checking that there all the parameter are specified and
		  	// not empty
	  		if(utility.isNotUndefined(request.body.main) && request.body.main
	  			&& utility.isNotUndefined(request.body.second) && request.body.second
	  			&& utility.isNotUndefined(request.body.side) && request.body.side
	  			&& utility.isNotUndefined(request.body.dessert) && request.body.dessert
	  			&& utility.isNotUndefined(request.body.date) && request.body.date)
		  	{

		  		// if it is the case we check the validity of the input
		  		// i.e. at least one among main,second,side and dessert 
		  		// must be a valid id
		  		var mainId = parseInt(request.body.main);
		  		var secondId = parseInt(request.body.second);
		  		var sideId = parseInt(request.body.side);
		  		var dessertId = parseInt(request.body.dessert);  		  	

		  		var dateObj;
		  		var date;

		  		if(utility.checkDate(request.body.date) && (mainId != -1 || secondId != -1 || sideId != -1 || dessertId != -1))
		  		{
					dateObj = new Date(request.body.date);
					date = utility.getOnlyDate(dateObj);
		  			
		  			var dishes = model.availability[date];

		  			// checking that the dishes are effectively
		  			// part of the menu of the specified date

		  			if(((mainId == -1) || (dishes.main.indexOf(model.dishes.main[mainId]) != -1))
		  				&& ((secondId == -1) || (dishes.second.indexOf(model.dishes.second[secondId]) != -1))
		  				&& ((sideId == -1) || (dishes.side.indexOf(model.dishes.side[sideId]) != -1))
		  				&& ((dessertId == -1) || (dishes.dessert.indexOf(model.dishes.dessert[dessertId]) != -1)))
		  			{			  			
		  				// if it is the case we proceed with the insert operation

			  			// Adding the order to the user list of orders
			  			var sess = request.session;
			  			var key = -1;
			  			if(utility.isNotUndefined(model.orders[sess.user]))
			  			{
			  				// otherwise we simply push the order to the list
			  				var max = -1;
			  				for (var property in model.orders[sess.user]) {
							    if (model.orders[sess.user].hasOwnProperty(property)) {
							    	var propertyValue = parseInt(property);
							        if(propertyValue > max)
							        {
							        	max = propertyValue;
							        }
							    }
							}

							max = max + 1;

			  				model.orders[sess.user][max] = {
			  						date : date
			  						, main : mainId
			  						, second : secondId
			  						, side : sideId
			  						, dessert : dessertId
			  				};

			  				key = max;
			  			}
			  			else
			  			{		  				
			  				// If the list is is empty we create it
			  				model.orders[sess.user] = {
			  					0 : {
				  						date : date
				  						, main : mainId
				  						, second : secondId
				  						, side : sideId
				  						, dessert : dessertId
			  						}
			  				};
			  				key = 0;
			  			}

			  			// Building the object with all the name of the ordered dishes
			  			// that will be added to the html table that shows the list by the client
			  			obj = {};
			  			obj['key'] = key;
			  			obj['date'] = date ;
			  			obj['main'] = (mainId != -1)? model.dishes['main'][mainId].name : "";
			  			obj['second'] = (secondId != -1)? model.dishes['second'][secondId].name : "";
			  			obj['side'] = (sideId != -1)? model.dishes['side'][sideId].name : "";
			  			obj['dessert'] = (dessertId != -1)? model.dishes['dessert'][dessertId].name : "";
		  			}
		  			else
		  			{
		  				// if some of the dishes are not part of the menu
		  				// we return an error message
		  				responseCode = 406;
		  				obj = {error : "Tutti i pasti specificati devono essere contenuti nel menu del giorno"};
		  			}

		  		}
		  		else
		  		{
		  			responseCode = 406;
		  			obj = {error : "Almeno uno tra primo,secondo, contorno e dessert deve essere selezionato"};
		  		}
		  	}
		  	else
		  	{		  		
		  		// if some parameters are missing or some of them are empty
		  		// we return an error message
		  		responseCode = 406;
		  		obj = {error : "Alcuni parametri sono assenti o vuoti"}
		  	}
		  	// conversion of the Javascript object to a JSON object
		  	var json = JSON.stringify(
			  	obj
			);

		  	response.writeHead(responseCode, headers);
		  	response.end(json);	  
	  	}
	  	else
	  	{	  		
	  		response.redirect("/login");
	  		response.end();
	  	} 
	  }
);

/*
*	The following sets the callback function that
*	answer to POST request of the form http://wesite.com/removeOrder
*	with a JSON object that contains the confirmation of the delete
*	operation on an order
*/
app.post("/removeOrder"
	, function (request, response)
	  {
	  	// at first we have to check if the user is logged in
	  	if(user.isUserLogged(request))
	  	{
	  		var headers = serverConfig.headers;
		  	headers["Content-Type"] = "application/json";
		  	var responseCode = 200;
		  	var obj;

	  		// checking that the order parameter is present in the request
	  		if(utility.isNotUndefined(request.body.order) && request.body.order)
	  		{
	  			// if it is the case we check the validiy of the input
	  			var order = parseInt(request.body.order);
	  			if(order != NaN)
  				{
  					// if the parameter is valid we have to check
  					// if the order really exixts
  					var username = request.session.user;
  					if(typeof model.orders[username][order] !== 'undefined')
  					{	
  						// if it is the case we effectively delete the order
  						delete model.orders[username][order];
  						obj = {key : order};
  					}
  					else
  					{
  						// otherwise we return an error message
  						responseCode = 406;
  						obj = {error : "L'ordine che stai cercando di cancellare non esiste"};
  					}
  				}
  				else
  				{
  					// if the input is invalid we return an error
  					responseCode = 406;
  					obj = {error : "Richiesta non valida"};
  				}
	  		}
	  		else
	  		{
	  			// empty or no parameter in the body of the request
	  			responseCode = 406;
	  			obj = {error : "Per poter cancellare un pasto bisogna selezionarne uno"};
	  		}

	  		// conversion of the Javascript object to a JSON object
		  	var json = JSON.stringify(
			  	obj
			);

		  	response.writeHead(responseCode, headers);		  	
		  	response.end(json);	
	  	}
	  	else
	  	{
	  		response.redirect('/login');
	  		response.end();
	  	}
	  }
);

/*
*	The following sets the callback function that
*	answer to POST request of the form http://wesite.com/editOrder
*	with a JSON object that contains the confimation the edit operation
*	on an order
*/
app.post("/editOrder"
	, function (request, response)
	  {
	  	// at first we have to check if the user is logged in
	  	if(user.isUserLogged(request))
	  	{
		  	var headers = serverConfig.headers;
		  	headers["Content-Type"] = "application/json";
		  	var responseCode = 200;
		  	var obj;
		  	
		  	// checking that there all the parameter are specified and
		  	// not empty
	  		if(utility.isNotUndefined(request.body.main) && request.body.main
	  			&& utility.isNotUndefined(request.body.second) && request.body.second
	  			&& utility.isNotUndefined(request.body.side) && request.body.side
	  			&& utility.isNotUndefined(request.body.dessert) && request.body.dessert
	  			&& utility.isNotUndefined(request.body.date) && request.body.date
	  			&& utility.isNotUndefined(request.body.order) && request.body.order)
		  	{
		  		// if it is the case we check the validity of the input
		  		// i.e. at least one among main,second,side and dessert 
		  		// must be a valid id
		  		var mainId = parseInt(request.body.main);
		  		var secondId = parseInt(request.body.second);
		  		var sideId = parseInt(request.body.side);
		  		var dessertId = parseInt(request.body.dessert);
		  		var dateObj
		  		var date;
		  		var order;
		  		
		  		if((parseInt(request.body.order) != NaN) && utility.checkDate(request.body.date) && (mainId != -1 || secondId != -1 || sideId != -1 || dessertId != -1))
		  		{
		  			dateObj = new Date(request.body.date);
					date = utility.getOnlyDate(dateObj);

		  			order = parseInt(request.body.order);

		  			var sess = request.session;
		  			var username = sess.user;

		  			// checking that the new dishes are effectively
		  			// part of the menu of the specified date

		  			if(((mainId == -1) || (dishes.main.indexOf(model.dishes.main[mainId]) != -1))
		  				&& ((secondId == -1) || (dishes.second.indexOf(model.dishes.second[secondId]) != -1))
		  				&& ((sideId == -1) || (dishes.side.indexOf(model.dishes.side[sideId]) != -1))
		  				&& ((dessertId == -1) || (dishes.dessert.indexOf(model.dishes.dessert[dessertId]) != -1)))
		  			{
		  				
		  				// if it is the case
			  			if(utility.isNotUndefined(model.orders[username][order]))
			  			{			  				
			  				// if the order exists we edit it
			  				model.orders[username][order] = {
			  						date : date
			  						, main : mainId
			  						, second : secondId
			  						, side : sideId
			  						, dessert : dessertId
			  				};
				  			// Building the object with all the name of the ordered dishes
				  			// that will be added to the html table that shows the list by the client
				  			obj = {};
				  			obj['key'] = order;
				  			obj['date'] = date;
				  			obj['main'] = (mainId != -1)? model.dishes['main'][mainId].name : "";
				  			obj['second'] = (secondId != -1)? model.dishes['second'][secondId].name : "";
				  			obj['side'] = (sideId != -1)? model.dishes['side'][sideId].name : "";
				  			obj['dessert'] = (dessertId != -1)? model.dishes['dessert'][dessertId].name : "";
			  			}
			  			else
			  			{
			  				// If the order doesn't exist we return an error
			  				responseCode = 406;
			  				obj = {error : "L'ordine che hai cercato di modificare non esiste"};
			  			}
			  		}
			  		else
			  		{
			  			// if some of the dishes are not part of the menu
		  				// we return an error message
		  				responseCode = 406;
		  				obj = {error : "Tutti i pasti specificati devono essere contenuti nel menu del giorno"};
			  		}
		  		}
		  		else
		  		{
		  			responseCode = 406;
		  			obj = {error : "Almeno uno tra primo,secondo, contorno e dessert deve essere selezionato"};
		  		}
		  	}
		  	else
		  	{	
		  		// if some parameters are missing or some of them are empty
		  		// we return an error message
		  		responseCode = 406;
		  		obj = {error : "Alcuni parametri sono assenti o vuoti"}
		  	}

		  	// conversion of the Javascript object to a JSON object
		  	var json = JSON.stringify(
			  	obj
			);

		  	response.writeHead(responseCode, headers);		
		  	response.end(json);	  
	  	}
	  	else
	  	{	  		
	  		response.redirect("/login");
	  		response.end();
	  	} 
	  }
);


app.listen(app.get('port'), function() {
  console.log('Node app is running');
});