// filename: main.js 

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in tutorial
require.config({
	paths: {
		  jquery: 'libs/jquery/jquery.min'
		, underscore: 'libs/underscore-amd/underscore'
		, backbone: 'libs/backbone-amd/backbone'
	}
});

require([
	// Load our app module and pass it to our definition function
	'app',
	], function (App) {
	// The "app" dependency is passed in as "App"
	App.initialize();
});