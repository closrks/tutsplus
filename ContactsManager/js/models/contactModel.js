// Filename: models/contactModel.js
define([
    'underscore'
  , 'backbone'
], function(_, Backbone){
  	var ContactModel = Backbone.Model.extend({
	    defaults: {
	        photo: "./img/placeholder.png"
	    }
	});
  // Return the model for the module
  return ContactModel;
});