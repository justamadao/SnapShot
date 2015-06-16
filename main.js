var snapshot = snapshot || {};

(function (views, callback) {
    var deferreds = [];

    $.each(views, function (index, view) {
        if (snapshot[view]) {
            deferreds.push($.get("tpl/" + view + ".html", function (data) {
                snapshot[view].prototype.template = _.template(data);
            }));
        } else {
            console.log(view + " not found");
        }
    });
    $.when.apply(null, deferreds).done(callback);

})(["HomeView", "HeaderView", "ListingView", "SnapshotView",
    "EditView", "FormView", "ImageView", "MapView"],
    function () {
        snapshot.router = new snapshot.Router();
        Backbone.history.start();
    });

