var express = require('express');

var app = express();

// port number used as default 
var port = 8080;
// address used as default
var address = "127.0.0.1";

app.use(bodyParser.urlencoded({extended: true}));    // to support URL-encoded bodies

app.set("port", (process.env.PORT || port));

// with the following we allow the access to static contents
// that are in the script folder but via another name, in this
// case 'scripts'
app.use("/scripts", express.static(__dirname + "/script"));

app.listen(app.get('port'), address);
console.log("Server running at http://" + address + ":" + port);