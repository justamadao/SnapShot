var snapshot = snapshot || {};

snapshot.HomeView = Backbone.View.extend({
    initialize: function () {
                    this.$el.html(this.template());
                },

    render: function () {
                return this;
            }
                    
});
