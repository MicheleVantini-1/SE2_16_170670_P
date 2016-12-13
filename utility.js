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

/*
*	This function try to convert a string to
*	a date and return only the year, month and
*	day in the format yyyy-mm-dd
* 	@param date - the date string to be conveted
* 	@return the date in the form yyyy-mm-dd if the conversion is ok
			null if the conversion goes wrong
*/

function getOnlyDate (date) {
	var res;
	if(checkDate(date))
	{
		var date = new Date(date);
		var year = date.getFullYear();
		var month = ((date.getMonth() + 1) > 9) ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
		var day = (date.getDate() > 9) ? date.getDate() : "0" + date.getDate();
		res = year + "-" + month + "-" + day;
	}
	else
	{
		res = null;
	}
	
	return res;
}

// EXPORTS
exports.isNotUndefined = isNotUndefined;
exports.checkDate = checkDate;
exports.getOnlyDate = getOnlyDate;