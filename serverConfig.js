// port number used as default 
var port = 8080;
// address used as default
var address;
var completeUrl;

var local = false;

if(local)
{
	var address = "localhost";
	var completeUrl = "http://" + address + ":" + port;
}
else
{
	address = "peaceful-sands-94334.herokuapp.com";
	completeUrl = "http://" + address;
}

// all the headers that will be set in the 
// http response header 
var headers = {};

// with this we allow any origin to access the resource
headers["Access-Control-Allow-Origin"] = "*"; 
// allowed methods
headers["Access-Control-Allow-Methods"] = "POST, GET"; 
headers["Access-Control-Allow-Credentials"] = false;
headers["Access-Control-Max-Age"] = '86400';
//types of headers that are allowed
headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"; 
// the format of the response 
headers["Content-Type"] = "text/html";


// EXPORTS
exports.port = port;
exports.address = address;
exports.completeUrl = completeUrl;
exports.headers = headers;