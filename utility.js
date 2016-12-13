/*
*	This function checks wether or not
*	the parameter field is undefined
*	@param field - the field to be checked
*	@return true if is not undefined
			false otherwise
*/
function isNotUndefined(field)
{
	return (typeof field !== 'undefined');
}

/*
*	This function try to convert a string to
*	a date and return true or false accordingly
*	to the result of the conversion
* 	@param date - the date string to be conveted
* 	@return true if the conversion is ok
			false otherwise
*/

function checkDate (date) {
	var date = new Date(date);
	var res;
	if(date == 'Invalid Date')
	{
		res = false;
	}
	else
	{
		res = true;
	}
	return res;
}

// EXPORTS
exports.isNotUndefined = isNotUndefined;
exports.checkDate = checkDate;