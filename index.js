var express = require('express');
var bodyParser = require('body-parser');
var bind = require('bind');
var serverConfig = require('./serverConfig.js');

var app = express();

// port number used as default 
var port = 8080;
// address used as default
var address = "127.0.0.1";
var completeUrl = "http://" + address + ":" + port;

app.use(bodyParser.urlencoded({extended: true}));    // to support URL-encoded bodies

app.set("port", (process.env.PORT || port));

// with the following we allow the access to static contents
// that are in the script folder but via another name, in this
// case 'scripts'
app.use("/scripts", express.static(__dirname + "/script"));

app.use("/bootstrapCss", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/bootstrapJs", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

console.log(__dirname + "/node_modules/bootstrap/dist/css");
console.log(__dirname + "/node_modules/bootstrap/dist/js");


// accpeting all the get request of the form http://localhost:port/
// and setting the proper callback function
app.get("/login"
	, function (request, response)
	  {
	  	// in this case we produce an html document from
	  	// a template but we leave all the parameters empty
	  	// because the user is requesting the home page
	    bind.toFile(
			'tpl/login.tpl'
			, {action : completeUrl}
			, function (data)
			  {				
				response.writeHead(200, serverConfig.headers);
				response.end(data);
			  }
		);
	  	
	  }
);

app.listen(app.get('port'), address);
console.log("Server running at http://" + address + ":" + port);