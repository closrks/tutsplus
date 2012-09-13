var fs = require('fs');

// synch version
console.log("Starting synch version...");
var data = fs.readFileSync("../sample.txt");
console.log("Contents: " + data);
console.log("Carry on executing...");

// asynch version
console.log("Starting asynch version...");
fs.readFile("../sample.txt", function (error, data) {
	console.log("Contents: " + data);
});
console.log("Carry on executing...");
