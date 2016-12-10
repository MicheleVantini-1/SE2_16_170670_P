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
		  	bind.toFile(
				'tpl/index.tpl'
				, {
		    		header : html.header
		    		, js : html.js
		    		, user : sess.user
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
											    console.log("G");

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
	  	if(user.isUserLogged(request))
	  	{
		  	var headers = serverConfig.headers;
		  	headers["Content-Type"] = "application/json";
		  	var obj;	  	
		  	
		  	// checking that the date field is present and not empty
		  	// in the body of the request
	  		if(utility.isNotUndefined(request.body.date) && request.body.date)
		  	{
		  		if(utility.checkDate(request.body.date))
		  		{
		  			var date = new Date(request.body.date);
			  		date.setHours(0,0,0,0);
			  		var now = new Date(Date.now());
			  		now.setHours(0,0,0,0);

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
			  			obj = {error : "The date must be after today"}
			  		}	
		  		}
		  		else
		  		{
		  			obj = {error : "The parameter passed as date is not a valid date"}
		  		}
		  		
		  	}
		  	else
		  	{
		  		// if there is no date in the body of the request or it is empty
		  		// we return an error message
		  		obj = {error : "empty or no date parameter"}
		  	}
	  		
	  		// conversion of the Javascript object to a JSON object
		  	var json = JSON.stringify(
			  	obj
			);

		  	response.end(json);	
		  		  		
	  	}
	  	else
	  	{
	  		response.redirect("/login");
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
	  	if(user.isUserLogged(request))
	  	{
	  		console.log("a");
		  	var headers = serverConfig.headers;
		  	headers["Content-Type"] = "application/json";
		  	var obj;	  	
		  	
		  	// checking that there all the parameter are specified and
		  	// not empty
		  	console.log(request.body.main);
		  	console.log(request.body.second);
		  	console.log(request.body.side);
		  	console.log(request.body.dessert);
		  	console.log(request.body.date);
	  		if(utility.isNotUndefined(request.body.main) && request.body.main
	  			&& utility.isNotUndefined(request.body.second) && request.body.second
	  			&& utility.isNotUndefined(request.body.side) && request.body.side
	  			&& utility.isNotUndefined(request.body.dessert) && request.body.dessert
	  			&& utility.isNotUndefined(request.body.date) && request.body.date)
		  	{
		  		console.log("b");
		  		// if it is the case we check the validity of the input
		  		// i.e. at least one among main,second,side and dessert 
		  		// must be a valid id
		  		var mainId = parseInt(request.body.main);
		  		var secondId = parseInt(request.body.second);
		  		var sideId = parseInt(request.body.side);
		  		var dessertId = parseInt(request.body.dessert);
		  		var date;

		  		if(utility.checkDate(request.body.date) && (mainId != -1 || secondId != -1 || sideId != -1 || dessertId != -1))
		  		{
		  			console.log("d");
		  			date = new Date(request.body.date);
		  			// Adding the order to the user list of orders
		  			var sess = request.session;
		  			if(utility.isNotUndefined(model.orders[sess.user]))
		  			{
		  				console.log("d");
		  				// otherwise we simply push the order to the list
		  				model.orders[sess.user].push(
		  					{
		  						date : date
		  						, main : mainId
		  						, second : secondId
		  						, side : sideId
		  						, dessertId : dessertId
		  					}
		  				);
		  			}
		  			else
		  			{		  				
		  				console.log("f");
		  				// If the list is is empty we create it
		  				model.orders[sess.user] = [
		  					{
		  						date : date
		  						, main : mainId
		  						, second : secondId
		  						, side : sideId
		  						, dessertId : dessertId
		  					}
		  				];
		  			}
		  			console.log("g");
		  			obj = {};
		  			obj['date'] = date.getFullYear() 
		  						+ "-" + (date.getMonth() +1) 
		  						+ "-" + date.getDate() ;
		  			obj['main'] = (mainId != -1)? model.dishes['main'][mainId].name : "";
		  			obj['second'] = (secondId != -1)? model.dishes['second'][secondId].name : "";
		  			obj['side'] = (sideId != -1)? model.dishes['side'][sideId].name : "";
		  			obj['dessert'] = (dessertId != -1)? model.dishes['dessert'][dessertId].name : "";
		  		}
		  	}
		  	else
		  	{
		  		console.log("h");
		  		// if some parameters are missing or some of them are empty
		  		// we return an error message
		  		obj = {error : "some parameters are empty or not present at all"}
		  	}
		  	console.log("i");  
		  	// conversion of the Javascript object to a JSON object
		  	var json = JSON.stringify(
			  	obj
			);

		  	response.end(json);	  
	  	}
	  	else
	  	{
	  		console.log("l");
	  		response.redirect("/login");
	  	} 
	  }
);


app.listen(app.get('port'), function() {
  console.log('Node app is running');
});