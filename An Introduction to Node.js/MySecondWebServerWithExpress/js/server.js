var fs = require('fs');
var express = require('express');

var config = JSON.parse(fs.readFileSync("../config.json"));
var host = config.host;
var port = config.port;

var app = express();

// check routes
app.use(app.router);
// then check statics
app.use(express.static("../public"));

app.get("/", function (request, response) {
	response.send("Hello world!");
});

app.get("/hello/:text", function (request, response) {
	response.send("Hello " + request.params.text);
});

var users = {
	"1" : {
		"name" : "Carlos"
		, "twitter" : "closrks"
	}
	, "2" : {
		"name" : "Fredo"
		, "twitter" : "xfredo"
	}
}

app.get("/user/:id", function (request, response) {
	var user = users[request.params.id];
	if (user) {
		response.send("<a href='http://twitter.com'" + user.twitter + ">Follow " +  user.name + " on twitter</a>")
	} else {
		response.send("Sorry! We can't find that user :(", 404);
	}
});

app.listen(port, host, function() {
	console.log("Listening on " + host + ":" + port);
});

