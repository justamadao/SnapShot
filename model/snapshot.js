var snapshot = snapshot || {};

snapshot.Snapshot = Backbone.Model.extend({
    collection: snapshot.SnapshotCollection,

    defaults: {
                  title: "",
                  description: "",
                  address: "",
                  tag: "404",
                  image: null
              },

    initialize: function () {
                    console.log(this);
                }
});

