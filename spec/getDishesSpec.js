var serverConfig = require("../serverConfig.js");

// Importing lib to send requests
var request = require("request");

// defining a cookie that will be 
// maintained across the different
// requests to maintain the authentication
var j = request.jar();

describe("Test cases for /getDishes : "
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

	  	describe("Sending undefined date parameter : "
		, function()
		  {
		  	it("undefined date"
		  		, function (done) 
		  		  {
		  		  	var date; // like this the date value is undefined
		  		  	
		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/getDishes"
		  		  			, form: {date : date}
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

		describe("Sending empty date parameter : "
		, function()
		  {
		  	it("empty date"
		  		, function (done) 
		  		  {
		  		  	var date = ""; // empty date

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/getDishes"
		  		  			, form: {date : date}
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

		describe("Sending text that cannot be converted into date : "
		, function()
		  {
		  	it("date = 'hello world'"
		  		, function (done) 
		  		  {
		  		  	var date = "hello world"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/getDishes"
		  		  			, form: {date : date}
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

		describe("Sending valid date but before today"
		, function()
		  {
		  	it("date = '2014-05-04'"
		  		, function (done) 
		  		  {
		  		  	var date = "2014-05-04"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/getDishes"
		  		  			, form: {date : date}
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

		describe("Sending valid date - today"
		, function()
		  {
		  	it("date = 2016-12-13" 
		  		, function (done) 
		  		  {
		  		  	var date = "2016-12-13"; 

		  		  	request.post(
		  		  		{
		  		  			url : serverConfig.completeUrl + "/getDishes"
		  		  			, form: {date : date}
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

			  				done();
			  			  }
		  			);
		  		  }
		  	);
		  }
		);
	  }
);