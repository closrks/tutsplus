var fs = require('fs');

console.log("Starting Config Read...");
var contents = fs.readFileSync("config.json");
console.log("String Contents: " + contents); // string form
var config = JSON.parse(contents); 
console.log("Object Config:", config); // object form
console.log("Object Property Username: ", config.username);