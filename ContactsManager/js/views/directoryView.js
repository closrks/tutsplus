define([
      'jquery'
    , 'underscore'
    , 'backbone'
    , 'views/contactView'
    , 'collections/directoryCollection'

], function ($, _, Backbone, ContactView, DirectoryCollection) {
    var DirectoryView = Backbone.View.extend({
          el: $('#contacts')
        , initialize: function () {

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
            
            this.collection = new DirectoryCollection(contacts);
            this.render();
            this.$el.find("#filter").append(this.renderSelect());

            // bind event
            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
        }
        , render: function () {
            
            this.$el.find("article").remove();
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
        , getTypes: function () {
            return _.uniq(this.collection.pluck("type"), false, function (type) {
                return type.toLowerCase();
            });
        }
        , renderSelect: function () {
            var filter = this.$el.find("#filter");
            var select = $("<select/>", {
                html: "<option value='all'>All</option>"
            });
            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase()
                    , text: item.toLowerCase()
                }).appendTo(select);
            });
            return select;
        }

        // ui event handler
        , events: {
            "change #filter select": "setFilter"
        }

        // handler
        , setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        }

        // custom change event
        , filterByType: function () {

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

            if (this.filterType === "all") {
                this.collection.reset(contacts);
            }
            else {
                this.collection.reset(contacts, { silent: true});
                var filterType = this.filterType;
                var filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type") === filterType;
                    });
                this.collection.reset(filtered);
            }
        }
    });

    return DirectoryView;
})