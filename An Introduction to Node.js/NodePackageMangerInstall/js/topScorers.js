var _ = require("underscore");

var scores = [84, 99, 91, 65, 87, 55, 72, 68, 95, 42]
, topScorers = []
, scoreLimit = 90;
 
topScorers = _.select(scores, function(score){ return score > scoreLimit;});
 
console.log(topScorers);