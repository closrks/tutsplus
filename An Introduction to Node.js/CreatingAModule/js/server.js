var github = require('./my_module/github.js');

github.getRepos('closrks', function (response) {
	console.log(response)
});