var mongo = require("mongodb");

// setup
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("nodejs-introduction", new mongo.Server(host, port, {}));

function getUser(id, callback) {
	// open connection
	db.open(function (error) {
		console.log("We are connected! " + host + ":" + port);

		db.collection("user", function (error, collection) {
			console.log("We have the collection!");
		
			collection.find({"id" : id.toString()}, function (error, cursor){
				cursor.toArray(function (error, users) {
					if (users.length === 0) {
						callback(false);
					} else {
						callback(users[0]);
					}
				});
			});
		});
	});
};

getUser(1, function(user) {
	if (!user) {
		console.log("No user found with id 1");
	} else {
		console.log("We have a user: ", user);
	}
});
