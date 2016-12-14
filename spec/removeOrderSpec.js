var serverConfig = require("../serverConfig.js");

// Importing lib to send requests
var request = require("request");

// defining a cookie that will be 
// maintained across the different
// requests to maintain the authentication
var j = request.jar();

/*
	PRECONDITION

	There should be some order to be removed

*/

var specificDate = "2017-01-01";
var availability;
var order1;
var order2;

describe("Test cases for /removeOrder : "
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
	  	
	  	/*
			Parameters: order 
				checks : - undefined
						 - empty
						 - parseInt != NaN
			Test cases :
			 - order = undefined
			 - order = ""
			 - order = "hello world"
			 - order = "0hello"
			 - order = '1'
			 - order = 2
	  	*/

		describe("Sending wrong parameter : "
		, function()
		  {
		  	it("order = undefined"
		  		, function (done) 
		  		  {
		  		  	var order;
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/removeOrder"
		  		  			, form: {
			  		  					order : order			  		  						
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

		describe("Sending wrong parameter : "
		, function()
		  {
		  	it("order = ''"
		  		, function (done) 
		  		  {
		  		  	var order = "";
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/removeOrder"
		  		  			, form: {
			  		  					order : order			  		  						
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

		describe("Sending wrong parameter : "
		, function()
		  {
		  	it("order = 'hello world'"
		  		, function (done) 
		  		  {
		  		  	var order = "hello world";
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/removeOrder"
		  		  			, form: {
			  		  					order : order			  		  						
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
			  				order1 = JSON.parse(body);
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
			  				order2 = JSON.parse(body);
			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);

		describe("Sending wrong parameter : "
		, function()
		  {
		  	it("order = '<order_id>hello'"
		  		, function (done) 
		  		  {
		  		  	var order = order1.key + "hello";
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/removeOrder"
		  		  			, form: {
			  		  					order : order			  		  						
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

		describe("Sending right parameter : "
		, function()
		  {
		  	it("order = <order_id>"
		  		, function (done) 
		  		  {
		  		  	var order = order2.key;
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/removeOrder"
		  		  			, form: {
			  		  					order : order			  		  						
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