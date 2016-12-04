/**
*	Function that check if the given username is associated
*	to some user in the database and if it is the case the password
*	is also checked. Therefore, if both username and password match
*	with the data in the database we return true
*	@param username - the username of the user
*	@param password - the password of the user
*	@return true if the user exists and the password is ok
			false otherwise
*/

function login(username, password)
{
	// TO-DO 

	return true;
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