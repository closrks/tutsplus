var fs = require("fs");

// sync read
console.log("Starting SyncRead...");
var content = fs.readFileSync("./sample.txt");
console.log("SyncRead: " + content);
console.log("Carry on executing");

console.log();

// async read
console.log("Starting AsyncRead...");
fs.readFile("./sample.txt", function (error, data) {
	console.log("AsyncRead: " + data);
});
console.log("Carry on executing");
