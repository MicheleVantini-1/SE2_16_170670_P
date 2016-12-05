var pg = require("pg");

/**
*	Function that check if the given username is associated
*	to some user in the database and if it is the case the password
*	is also checked. Therefore, if both username and password match
*	with the data in the database we return the user id
*	@param username - the username of the user
*	@param password - the password of the user
*	@return the id of the user if the user exists and the password is ok
			-1 otherwise
*/

function login(username, password)
{
	var res = -1;
	// in order to query the database we start a connection to it
	pg.connect(process.env.DATABASE_URL
			 , function(err, client, done) 
			   {
			   		// once the connection will be enstabilished we can 
			   		// query the database

			   		// definition of the parameterized query
			   		var queryConfig = {
			   			text : "SELECT id FROM users WHERE username = $1 AND password = $2"
			   			, values : [username, password]
			   		};

			   		// execution of the query
					client.query( queryConfig
								, function(err, result) 
								  {
									// once the query will be executed 
									done();

									if (err)
									{ 
									   console.error(err); 
									}
									else
									{ 
										if(result.rowCount != 0)
										{
											res = result.rows[0].id;
										}
									}
								  }
					);

  				}
  	);

	var returnValue;
  	if(res != -1)
  	{
  		returnValue = true;
  	}
  	else
  	{
  		returnValue = false;
  	}

	return returnValue;
}

/**
*	Function that insert all the information passed as parameters
*	into the database in order to cerate a new user and if everything
* 	is ok with the query it returns true otherwise false
*	@param username - the username of the new user
*	@param password - the password of the new user
*	@param birthday - the birthday of the new user
*	@param phoie - the password of the new user
*	@param email - the email of the new user
*	@return true if everything is ok with the query execution
			false otherwise
*/

function register(username, password, email, birthday, phone)
{
	// TO-DO 

	return true;
}


// EXPORTS 
exports.login = login;
exports.register = register;