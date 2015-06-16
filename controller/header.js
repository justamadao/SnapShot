var snapshot = snapshot || {};

snapshot.HeaderView = Backbone.View.extend({
    initialize: function () {
                    this.$el.html(this.template());
                },

    render: function () {
                return this;
            }
});
