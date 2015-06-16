var snapshot = snapshot || {};

snapshot.utils = {
    geoLocationSupport: function () {
                            if (navigator.geolocation) {
                                return true;
                            } else {
                                return false;
                            }
                        }
};
