var fs = require('fs');
var express = require('express');
var mongo = require("mongodb");

// setup
var config = JSON.parse(fs.readFileSync("../config.json"));
var host = config.host;
var port = config.port;
var dbHost = "127.0.0.1";
var dbPort = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("nodejs-introduction", new mongo.Server(dbHost, dbPort, {}));

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

app.get("/user/:id", function (request, response) {

	getUser(request.params.id, function (user) {
		if (user) {
			response.send("<a href='http://twitter.com'" + user.twitter + ">Follow " +  user.name + " on twitter</a>")
		} else {
			response.send("Sorry! We can't find that user :(", 404);
		}
	});
});

app.listen(port, host, function() {
	console.log("Listening on " + host + ":" + port);
});

function getUser(id, callback) {
	// open connection
	db.open(function (error) {
		console.log("We are connected! " + dbHost + ":" + dbPort);

		db.collection("user", function (error, collection) {
			console.log("We have the collection!");
		
			collection.find({"id" : id.toString()}, function (error, cursor){
				cursor.toArray(function (error, users) {
					if (users.length === 0) {
						db.close();
						callback(false);
					} else {
						db.close();
						callback(users[0]);
					}
				});
			});
		});
	});
};
