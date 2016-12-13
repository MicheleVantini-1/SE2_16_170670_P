var serverConfig = require("../serverConfig.js");
var model = require("../model.js");

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
			  				expect(response.statusCode).toBe(302);

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);
	  	
	  	/*
			order 
				checks : - undefined
						 - empty
						 - parseInt != NaN
			order = undefined
			order = ""
			order = "hello world"
			order = "0ciao"
			order = 0
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

		describe("Sending wrong parameter : "
		, function()
		  {
		  	it("order = '0hello'"
		  		, function (done) 
		  		  {
		  		  	var order = "0hello";
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

		describe("Sending right parameter : "
		, function()
		  {
		  	it("order = '0'"
		  		, function (done) 
		  		  {
		  		  	var order = "0";
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

		describe("Sending right parameter : "
		, function()
		  {
		  	it("order = 0"
		  		, function (done) 
		  		  {
		  		  	var order = 0;
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

	  }
);