var mongo = require('mongodb');

// setup
var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('nodejs-introduction', new mongo.Server(host, port, {}));

// open connection
db.open(function (error) {
	console.log('We are connected! ' + host + ':' + port);

	db.collection('user', function (error, collection) {
		console.log("We have the collection!");
	
		collection.insert({
			id : '1'
			, name : 'Carlos Avila'
			, twitter : 'closrks'
			, email : 'carlosavila.ce@gmail.com'
		}, function () {
			console.log("Inserted carlosavila");
		});

		collection.insert({
			id : '2'
			, name : 'Fredo Pulido'
			, twitter : 'xfredo'
			, email : 'xfredo@gmail.com'
		}, function () {
			console.log("Inserted fredopulido");
		});
	});
});