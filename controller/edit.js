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

    initSubview: function () {
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

    events: {"submit #snapshot-form": "update",
                "click #use-current-location": "useCurrentLocation"},

    update: function (evt) {
        evt.preventDefault();

        this.model.set(this.getAttributes());
        if (this.model.id){
            snapshot.events.trigger("collection:update_snapshot", this.model);
        } else {
            snapshot.events.trigger("collection:new_snapshot", this.model);
        }
        snapshot.router.navigate("browse", true);
    },

    useCurrentLocation: function (evt) {
                            evt.preventDefault();
                            var that = this;
                            if(snapshot.utils.geoLocationSupport()){
                                navigator.geolocation.getCurrentPosition(function (position) {
                                    that.updateAddress(position, that);
                                });
                            } else {
                                alert("geo location is not supported");
                            }
                        },

    updateAddress: function (position, that) {
                       $.get("http://geocoder.ca/", 
                               {latt: position.coords.latitude,
                                   longt: position.coords.longitude,
                       reverse: 1,
                       json: 1})
                        .done(function (data) {
                            var addr = data.stnumber + " " +
                                       data.staddress + ", " + 
                                       data.city + ", " + 
                                       data.prov + ". " +
                                       data.postal;
                            that.model.set("address", addr);
                            that.$("#address").val(that.model.attributes.address);
                        });
                   },

    getAttributes: function () {
                       return {title: this.$("#title").val(),
                           description: this.$("#description").val(),
                           address: this.$("#address").val(),
                           tag: this.$("#tag").val()};
                   },

    render: function () {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }
});


snapshot.ImageView = Backbone.View.extend({
    setModel: function (model) {
                  this.model = model;
              },

    events: {"change #image-upload": "prepareImageUpload",
                "change #camera-snapshot" : "prepareImageUpload"},

    prepareImageUpload: function (evt) {
        var input = evt.originalEvent.target;
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            var model = this.model;

            reader.onload = function (evt) {
                $("#image-preview").attr('src', evt.target.result);
                model.set("image", evt.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    },

    render: function () {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }
});
