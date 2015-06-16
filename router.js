var snapshot = snapshot || {};


snapshot.Router = Backbone.Router.extend({
    routes: {
                "": "home",
    "browse": "listing",
    "edit": "create",
    "edit/:id": "edit"
            },

    initialize: function () {
                    //global events listener/handler
                    snapshot.events = _.extend({}, Backbone.Events);

                    snapshot.collection = new snapshot.SnapshotCollection();
                    this.model = new snapshot.Snapshot();

                    this.headerView = new snapshot.HeaderView();
                    this.homeView = new snapshot.HomeView();
                    this.listingView = new snapshot.ListingView(snapshot.collection);
                    this.editView = new snapshot.EditView(this.model);

                    $('#header').html(this.headerView.render().el);
                },

    home: function () {
              $('#body').html(this.homeView.render().el);
          },

    listing: function () {
                 $('#body').html(this.listingView.render().el);
             },

    create: function () {
                var new_model = new snapshot.Snapshot();
                this.editView.setModel(new_model);
                $('#body').html(this.editView.render().el);
            },

    edit: function (id) {
              this.editView.setModel(snapshot.collection.get(id));
              $('#body').html(this.editView.render().el);
          }
});


