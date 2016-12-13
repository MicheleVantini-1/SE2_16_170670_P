var serverConfig = require("../serverConfig.js");
var model = require("../model.js");

// Importing lib to send requests
var request = require("request");

// defining a cookie that will be 
// maintained across the different
// requests to maintain the authentication
var j = request.jar();

var availability;

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

		describe("Sending valid date - after today and with menu"
		, function()
		  {
		  	it("date = 2017-01-01"
		  		, function (done) 
		  		  {
		  		  	var date = '2017-01-01'; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/getDishes"
		  		  			, form: {date : date}
		  		  			, jar : j
		  		  		}
		  		  		, function(error, response, body)
			  			  {
			  				expect(response.statusCode).toBe(200);
			  				availability = JSON.parse(body);
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
		  	it("main, second, side, dessert taken from the menu);  parsable date"
		  		, function (done) 
		  		  {
		  		  	var date = "2017-01-01";

 		  		  	var main = availability["main"][0].key;
		  		  	var second = availability["second"][0].key; 
		  		  	var side = availability["side"][0].key; 
		  		  	var dessert = availability["dessert"][0].key; 
					
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