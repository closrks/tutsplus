var http = require('http');
console.log("Starting");

var host = "127.0.0.1";
var port = 1337;
var server = http.createServer(function (request, response) {
	console.log("Received request: " + request.url);
	response.writeHead(200, {"Content-type":"text/plain"});
	response.write("Hello world!", "utf8");
	response.end();
});

server.listen(port, host, function() {
	console.log("Listening on " + host + ":" + port);
});