var serverConfig = require("../serverConfig.js");
var model = require("../model.js");

// Importing lib to send requests
var request = require("request");

// defining a cookie that will be 
// maintained across the different
// requests to maintain the authentication
var j = request.jar();

describe("Test cases for /addOrder : "
	, function()
	  {
	  	describe("Login for testing purpose : "
		, function()
		  {
		  	it("login"
		  		, function (done) 
		  		  {
		  		  	var date; // like this the date value is undefined
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/doLogin"
		  		  			, form: {username : "prova", password : "prova"}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {
			  				expect(response.statusCode).toBe(302);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);
	  	
		describe("Sending wrong parameters : "
		, function()
		  {
		  	it("each parameter undefined"
		  		, function (done) 
		  		  {
		  		  	var main; // like this the main value is undefined
		  		  	var second; // like this the second value is undefined
		  		  	var side; // like this the side value is undefined
		  		  	var dessert; // like this the dessert value is undefined
		  		  	var date; // like this the date value is undefined
		  		  	
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(406);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending wrong parameters : "
		, function()
		  {
		  	it("each parameter empty"
		  		, function (done) 
		  		  {
		  		  	var main = ""; 
		  		  	var second = ""; 
		  		  	var side = ""; 
		  		  	var dessert = ""; 
		  		  	var date = ""; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(406);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending wrong parameters : "
		, function()
		  {
		  	it("main, second, side, dessert = -1 and non parsable date"
		  		, function (done) 
		  		  {
		  		  	var main = -1; 
		  		  	var second = -1; 
		  		  	var side = -1; 
		  		  	var dessert = -1; 
		  		  	var date = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(406);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending partially wrong parameters : "
		, function()
		  {
		  	it("main, second, side = -1; dessert = 1; non parsable date"
		  		, function (done) 
		  		  {
		  		  	var main = -1; 
		  		  	var second = -1; 
		  		  	var side = -1; 
		  		  	var dessert = 1; 
		  		  	var date = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(406);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending partially wrong parameters : "
		, function()
		  {
		  	it("main, second, side , dessert = 1; non parsable date"
		  		, function (done) 
		  		  {
		  		  	var main = 1; 
		  		  	var second = 1; 
		  		  	var side = 1; 
		  		  	var dessert = 1; 
		  		  	var date = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(406);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending partially wrong parameters : "
		, function()
		  {
		  	it("main, second, side, dessert = 1 (we don't know if they're present or not in the menu);  parsable date"
		  		, function (done) 
		  		  {
		  		  	var main = 1; 
		  		  	var second = 1; 
		  		  	var side = 1; 
		  		  	var dessert = 1; 
		  		  	var date = "2017-01-01"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(406);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending right parameters : "
		, function()
		  {
		  	it("main, second, side, dessert = 1 (we don't know if they're present or not in the menu);  parsable date"
		  		, function (done) 
		  		  {
		  		  	var date = "2017-01-01";
 		  		  	var main = model.availability[date].main[0];
		  		  	var second = model.availability[date].second[0]; 
		  		  	var side = model.availability[date].side[0]; 
		  		  	var dessert = model.availability[date].dishes[0]; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/addOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date			  		  						
		  		  					}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {

			  				expect(response.statusCode).toBe(200);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);
	  }
);