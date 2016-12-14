var serverConfig = require("../serverConfig.js");

// Importing lib to send requests
var request = require("request");

// defining a cookie that will be 
// maintained across the different
// requests to maintain the authentication
var j = request.jar();

var availability;
var specificOrder;
var specificDate = "2017-01-01";

describe("Test cases for /editOrder : "
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
			  				expect(response.statusCode).toBe(200);

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
		  		  	var order; // like this the order value is undefined
		  		  	
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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
		  		  	var order = ""; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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
		  	it("main, second, side, dessert = -1 ; non parsable date; non integer order"
		  		, function (done) 
		  		  {
		  		  	var main = -1; 
		  		  	var second = -1; 
		  		  	var side = -1; 
		  		  	var dessert = -1; 
		  		  	var date = "hello world"; 
		  		  	var order = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date	
			  		  					, order : order		  		  						
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
		  	it("main, second, side = -1; dessert = 1; parsable date ; non integer order"
		  		, function (done) 
		  		  {
		  		  	var main = -1; 
		  		  	var second = -1; 
		  		  	var side = -1; 
		  		  	var dessert = 1; 
		  		  	var date = "2017-01-01"; 
		  		  	var order = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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
		  	it("main, second, side = -1; dessert = 1; non parsable date ; integer order"
		  		, function (done) 
		  		  {
		  		  	var main = -1; 
		  		  	var second = -1; 
		  		  	var side = -1; 
		  		  	var dessert = 1; 
		  		  	var date = "hello world"; 
		  		  	var order = "0"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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
		  	it("main, second, side , dessert = 1; non parsable date; non integer order"
		  		, function (done) 
		  		  {
		  		  	var main = 1; 
		  		  	var second = 1; 
		  		  	var side = 1; 
		  		  	var dessert = 1; 
		  		  	var date = "hello world"; 
		  		  	var order = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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
		  	it("main, second, side , dessert = 1; parsable date; non integer order"
		  		, function (done) 
		  		  {
		  		  	var main = 1; 
		  		  	var second = 1; 
		  		  	var side = 1; 
		  		  	var dessert = 1; 
		  		  	var date = "2017-01-01"; 
		  		  	var order = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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

		/*
			Testing getDishes only with the purpose of getting the menu
			that will be used in the next test
		*/
		describe("Testing getDishes only with the purpose of getting the menu"
		, function()
		  {
		  	it("date = " + specificDate
		  		, function (done) 
		  		  {
		  		  	var date = specificDate; 

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

		/*
			Testing getDishes only with the purpose of of adding an order
			that will be used in the next test
		*/
		describe("Testing addOrder only with the purpose of adding an order : "
		, function()
		  {
		  	it("date = " + specificDate
		  		, function (done) 
		  		  {
		  		  	var date = specificDate;

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
			  				specificOrder = JSON.parse(body);
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
		  		  	var date = specificDate;

 		  		  	var main = availability["main"][0].key;
		  		  	var second = availability["second"][0].key; 
		  		  	var side = availability["side"][0].key; 
		  		  	var dessert = availability["dessert"][0].key;

		  		  	var order = specificOrder.key;
					
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/editOrder"
		  		  			, form: {
			  		  					main : main
			  		  					, second : second
			  		  					, side : side
			  		  					, dessert : dessert
			  		  					, date : date
			  		  					, order : order			  		  						
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