var https = require('https');
var options = {
	host: 'stream.twitter.com'
	, path: '/1/statuses/filter.json?track=hollywood'
	, method: 'GET'
	, headers: {
		"Authorization": "Basic " + new Buffer("closrks:Limegreen1").toString("base64")
	}
};

var mongo = require('mongodb');
var dbHost = "127.0.0.1";
var dbPort = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("tweetDB", new mongo.Server(dbHost, dbPort, {}));
var tweetCollection;

db.open(function (error) {
	console.log("We are connected! " + dbHost + ":" + dbPort);

	db.collection("tweet", function (error, collection) {
		tweetCollection = collection;
	});
});

var request = https.request(options, function (response) {
	response.on("data", function (chunk) {
		var tweet = JSON.parse(chunk);
		tweetCollection.insert(tweet, function (error){
			if (error) {
				console.log("Error: ", error.message);
			} else {
				console.log("Inserted into database");	
			}
		});
		console.log("Tweet " + tweet.text);
	});

	response.on("end", function (){
		console.log("Disconntected");
	});
});
request.end();
