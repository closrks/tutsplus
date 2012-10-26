// Filename: collections/projects
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/contactModel'
], function(_, Backbone, ContactModel){
  	var DirectoryCollection = Backbone.Collection.extend({
    	model: ContactModel
	});
  // You don't usually return a collection instantiated
  return DirectoryCollection;
});