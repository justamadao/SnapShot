var snapshot = snapshot || {};

snapshot.ListingView = Backbone.View.extend({
    initialize: function (collection) {
                    this.collection = collection;
                    this.$el.html(this.template());

                    this.registerListener();

                    this.collection.fetch({
                        context: this,
                        success: this.init
                    });
                },

    init: function (models) {
              this.rerender();
          },

    registerListener: function () {
                          this.listenTo(snapshot.events, "listing:rerender", this.rerender);
                      },

    events: {"click .snapshot": "showMenu",
             "click .edit": "editSnapshot",
             "click .delete": "deleteSnapshot"},

    showMenu: function (evt) {
        this.selected_snapshot = $("input.hidden", evt.currentTarget).val();
    },

    editSnapshot: function (evt) {
                      this.$("button[class=close]").click();
                      snapshot.router.navigate("#edit/" + this.selected_snapshot, true);
                   },

    deleteSnapshot: function (evt) {
                         var model = this.collection.get(this.selected_snapshot);
                         snapshot.events.trigger("collection:destroy_snapshot", this.selected_snapshot);
                         this.$("button[class=close]").click();
                     },

    render: function () {
                this.delegateEvents();
                return this;
            },

    renderOne: function (model) {
                   var view = new snapshot.SnapshotView(model);
                   this.$('#snapshots').prepend(view.render().el);
               },

    rerender: function () {
                  this.$("#snapshots").html("");
                  this.collection.each(this.renderOne, this);
              }
});


snapshot.SnapshotView = Backbone.View.extend({
    initialize: function (model) {
                    this.model = model;

                    this.$el.html(this.template(this.model.attributes));
                },



    render: function () {
                return this;
            }
});
