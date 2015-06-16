var snapshot = snapshot || {};


snapshot.EditView = Backbone.View.extend({
    initialize: function (model) {
                    this.$el.html(this.template());
                    this.model = model;
                    this.initSubview();
                },



    setModel: function (model) {
                  this.model = model;
              },

    initSubview: function (options) {
                     this.formView = new snapshot.FormView();
                     this.imageView = new snapshot.ImageView();
                     this.mapView = new snapshot.MapView();
                 },

    render: function () {
                this.formView.setModel(this.model);
                this.$('#form').html(this.formView.render().el);

                this.imageView.setModel(this.model);
                this.$('#image-field').html(this.imageView.render().el);

                this.$('#map').html(this.mapView.render().el);

                this.formView.delegateEvents();
                this.imageView.delegateEvents();
                return this;
            }
});


snapshot.MapView = Backbone.View.extend({
    initialize: function () {
                    this.$el.html(this.template());
                },

    render: function () {
                return this;
            }
});


snapshot.FormView = Backbone.View.extend({
    setModel: function (model) {
                  this.model = model;
              },

    events: {"submit #snapshot-form": "update"},

    update: function (evt) {
        evt.preventDefault();
        var attributes = {
            title: this.$("#title").val(),
            description: this.$("#description").val(),
            address: this.$("#address").val(),
            tag: this.$("#tag").val()
        };

        this.model.set(attributes);

        if (this.model.id){
            snapshot.events.trigger("collection:update_snapshot", this.model);
        } else {
            snapshot.events.trigger("collection:new_snapshot", this.model);
        }
        snapshot.router.navigate("browse", true);
    },

    render: function () {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }
});

snapshot.ImageView = Backbone.View.extend({
    initialize: function () {
                },

    setModel: function (model) {
                  this.model = model;
              },

    events: {"change #image-upload": "prepareImageUpload,
             "change #camera-snapshot" : "prepareImageUpload"},

    prepareImageUpload: function (evt) {
        var input = evt.originalEvent.target;
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            var model = this.model;

            reader.onload = function (evt) {
                $("#image-preview").attr('src', evt.target.result);
                model.set("image", evt.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    },

    render: function () {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }
});
