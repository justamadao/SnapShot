var snapshot = snapshot || {};


snapshot.Snapshot = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('snapshot-backbone'),

    defaults: {
                  title: "",
                  description: "",
                  address: "",
                  tag: "",
                  image: "http://placehold.it/400x300"
              },
});


snapshot.SnapshotCollection = Backbone.Collection.extend({

    model: snapshot.Snapshot,

    localStorage: new Backbone.LocalStorage('snapshot-backbone'),

    initialize: function () {
        this.registerListener();
    },

    registerListener: function () {
                          this.listenTo(snapshot.events, "collection:destroy_snapshot", this.destroyOne);
                          this.listenTo(snapshot.events, "collection:new_snapshot", this.addOne);
                          this.listenTo(snapshot.events, "collection:update_snapshot", this.updateOne);
                      },

    destroyOne: function (id) {
                   var model = this.get(id);
                   model.destroy();
                   snapshot.events.trigger("listing:rerender");
               },

    addOne: function (model) {
                this.create(model.attributes);
                snapshot.events.trigger("listing:rerender");
            },

    updateOne: function (model) {
                   model.save();
                   snapshot.events.trigger("listing:rerender");
               }

});



