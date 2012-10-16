// Filename: router.js
define([
    'jquery'
  , 'underscore'
  , 'backbone'
  , 'views/directoryView'
], function($, _, Backbone, DirectoryView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'showDirectory'
    }

    , showDirectory: function () {
      // Call render on the module we loaded in via the dependency array
      // 'views/directoryView'
      var directoryView = new DirectoryView();
      directoryView.render();
    }

  });

  var initialize = function(){

    var app_router = new AppRouter;

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});