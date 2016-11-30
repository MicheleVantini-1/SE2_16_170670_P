/**
*	Function that produces a page starting from
*	a template, its parameters and set the proper
*	callback function that sets the headers of the
*	the passed http response and sends it back
*	@param template - the tamplate to fill
*	@param parameters - the parameters of the template
*	@param response - the response that has to be modified
*	@param headers - the headers that has to be set to the response
*/
function bindToTemplate(template, parameters, response, headers)
{
	bind.toFile(
		template
		, parameters
		, function (data)
		  {				
			response.writeHead(200, headers);
			response.end(data);
		  }
	);
}

/**
*	Function that produces a page starting from
*	a template, its parameters and set the proper
*	callback function that sets the predefined header (see serverConfig.js)
*	of the the passed http response and sends it back
*	@param template - the tamplate to fill
*	@param parameters - the parameters of the template
*	@param response - the response that has to be modified
*/
function bindToTemplate(template, parameters, response)
{
	bind.toFile(
		template
		, parameters
		, function (data)
		  {				
			response.writeHead(200, serverConfig.headers);
			response.end(data);
		  }
	);
}

exports.bindToTemplate = bindToTemplate;