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
var html = require('./html.js');

var app = express();

app.use(cookieParser());
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
	  	if(typeof sess.user !== 'undefined' && sess.user)
	  	{
	  		// if the user is logged we produce an html document from
		  	// a template that is the home page
		    bindWrapper.bindToTemplate(
		    	'tpl/index.tpl'
		    	, {
		    		header : html.header
		    		, js : html.js
		    		, user : sess.user
		    		, base : serverConfig.completeUrl
		    	  }
		    	, response
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
				response.writeHead(200, serverConfig.headers);
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
				response.writeHead(200, serverConfig.headers);
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


app.listen(app.get('port'), function() {
  console.log('Node app is running');
});