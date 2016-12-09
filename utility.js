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

// EXPORTS
exports.isNotUndefined = isNotUndefined;