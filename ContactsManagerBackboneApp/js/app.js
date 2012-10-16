// fake data array
(function ($) {
    var contacts = [
        { name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" }
    ];

    // create contact model
    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "./img/placeholder.png"
        }
    });

    // create directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    // create directory view
    var ContactView = Backbone.View.extend({
          tagName: "article"
        , className: "contact-container"
        , template: _.template($('#contactTemplate').html())
        , render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    // create master directory view
    var DirectoryView = Backbone.View.extend({
        el: $('#contacts')
        , initialize: function () {
            this.collection = new Directory(contacts);
            this.render();
        }
        , render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderContact(item);
            }, this);
        }
        , renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        }
    });

    var directory = new DirectoryView(); 

} (jQuery));