define([
      'jquery'
    , 'underscore'
    , 'backbone'

], function ($, _, Backbone) {
    var ContactView = Backbone.View.extend({
          tagName: "article"
        , className: "contact-container"
        , template: _.template($('#contactTemplate').html())
        , render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return ContactView;
})