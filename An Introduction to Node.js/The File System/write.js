var fs = require('fs');

// write sync
console.log("Starting Sync Write...");
fs.writeFileSync("writeSync.txt", "Hello world! I am Synchronous!");
console.log("Finished writing!");

// write async
console.log("Starting Async Write...");
fs.writeFile("writeAsync.txt", "Hello world! I am Asynchronous!", function (error) {
	console.log("Written file");
});