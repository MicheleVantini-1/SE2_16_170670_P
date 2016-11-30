var express = require('express');
var bodyParser = require('body-parser');
var bind = require('bind');
var session = require("express-session");
var serverConfig = require('./serverConfig.js');
var login = require('./login.js');
var bindWrapper = require('./bindWrapper.js');

var app = express();

// port number used as default 
var port = 8080;
// address used as default
var address = "127.0.0.1";
var completeUrl = "http://" + address + ":" + port;

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

app.set("port", (process.env.PORT || port));

// with the following we allow the access to static contents
// that are in the script folder but via another name, in this
// case 'scripts'
app.use("/scripts", express.static(__dirname + "/script"));

// with the followings we allow the access to static contents
// that are in the boostrap folder but via another name, in this
// case 'bootstrapCss' and 'bootstrapJs'
app.use("/bootstrapCss", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/bootstrapJs", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

var sess;

app.get("/"
	, function (request, response)
	  {
	  	// Getting the user session
	  	sess = request.session;
	  	// We have to check the credentials of the user
	  	if(typeof sess.user !== 'undefined' && sess.user)
	  	{
	  		// if the user is logged we produce an html document from
		  	// a template that is the home page
		    bindWrapper.bindToTemplate(
		    	'public/index.tpl'
		    	, {user : sess.user}
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
	    bindWrapper.bindToTemplate(
		    	'public/login.tpl'
		    	, {user : sess.user}
		    	, response
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
				    		var logged = login.login(username, password);
				    		if(logged)
				    		{
				    			response.redirect("/");
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

	    }
	  }

);

app.listen(app.get('port'), address);
console.log("Server running at http://" + address + ":" + port);