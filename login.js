var model = require('./model.js');

/**
*	Function that check if the given username is associated
*	to some user in the users data structure and if it is the case the password
*	is also checked. Therefore, if both username and password match
*	with the data in the users data structure we return the user id
*	@param username - the username of the user
*	@param password - the password of the user
*	@return the id of the user if the user exists and the password is ok
			-1 otherwise
*/

function login(username, password)
{
	var res = false;
	
	if(typeof model.users[username] !== 'undefined')
	{
		if(model.users[username].password === password)
		{
			res = true;
		}
	}

	return res;
}

/**
*	Function that insert all the information passed as parameters
*	into the users data structure in order to cerate a new user and 
*	if everything is ok with the query it returns true otherwise false
*	@param username - the username of the new user
*	@param password - the password of the new user
*	@param birthday - the birthday of the new user
*	@param phoie - the password of the new user
*	@param email - the email of the new user
*	@return true if everything is ok with the query execution
			false otherwise
*/

function register(username, password, birthday, phone)
{
	var res = false;

	if(typeof model.users[username] === 'undefined')
	{
		model.users[username] = {
			password : password
			, birthday : birthday
			, phone : phone
		};
		res = true;
	}

	return res;	
}

/*
*	This function checks whether or not
*	the user is authenticated and return
*	true or false accordingly
*	@return true if the user is logged
			false otherwise
*/
function isUserLogged(request)
{
	var res = false;
	// Getting the session
  	var sess = request.session;
  	// We have to check the credentials of the user
  	if(typeof sess.user !== 'undefined' && sess.user)
  	{
  		res = true;
  	}

  	return res;
}

// EXPORTS 
exports.login = login;
exports.register = register;
exports.isUserLogged = isUserLogged;