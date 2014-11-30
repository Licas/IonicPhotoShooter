(function(){

     var GeolocationFactory = function($http, $log) {

        var geolocation = {};

        geolocation.getPosition = function() {

            // onSuccess Callback
            // This method accepts a Position object, which contains the current GPS coordinates
            var onSuccess = function(position) {

            $log.info("Lon:"+position.coords.longitude+",Lat:"+position.coords.latitude);
            //Converti in strada http://nominatim.openstreetmap.org/reverse?format=json&lat="+position.coords.latitude+"&lon=-83.952"+position.coords.longitude

                //ESEMPIO CON GOOGLE API
                $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude).
                  success(function(data, status, headers, config) {
                    var addrGmap = JSON.stringify(data.results[0]);

                    $http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat='+position.coords.latitude+'&lon='+position.coords.longitude).
                  success(function(data2, status, headers, config) {
                    var addr = JSON.stringify(data2);


                     $log.info("La tua posizione:" +
                         "GmapAPi:"+JSON.parse(addrGmap).formatted_address);

                    alert("La tua posizione:\n" +
                            "GmapApi:"+ JSON.parse(addrGmap).formatted_address +"\n" +
                              "OpenStreetMap:"+JSON.parse(addr).display_name);
                          });

                  }).
                  error(function(data, status, headers, config) {
                    alert("impossibile determinare la posizione: "+data);
                  });
                
                /*
                ESEMPIO CON OPENSTREETMAP
                var req = {
                    method: 'GET',
                    url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+position.coords.latitude+'&lon='+position.coords.longitude,
 
            };

                $http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat='+position.coords.latitude+'&lon='+position.coords.longitude).
                  success(function(data, status, headers, config) {
                    var addr = JSON.stringify(data.address);
                    
                      $log.info("La tua posizione:\\n" + 
                         "Strada:"+JSON.parse(addr).road+"\\n" + 
                         "Citta':"+JSON.parse(addr).city+"\\n" + 
                         "Regione/Stato:"+JSON.parse(addr).state+"\\n"+
                         "Nazione:"+JSON.parse(addr).contry+"\\n");
                    alert("La tua posizione:\n" + 
                         "Strada:"+JSON.parse(addr).road+"\n" + 
                         "Citta':"+JSON.parse(addr).city+"\n" + 
                         "Regione/Stato:"+JSON.parse(addr).state+"\n"+
                         "Nazione:"+JSON.parse(addr).country+"\n");
               
                  }).
                  error(function(data, status, headers, config) {
                    alert("impossibile determinare la posizione: "+data);
                  });*/
                
            };

            // onError Callback receives a PositionError object
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }

            var geolocationOpts = {
              enableHighAccuracy: true,//Provides a hint that the application needs the best possible results. By default, the device attempts to retrieve a `Position` using network-based methods. Setting this property to `true` tells the framework to use more accurate methods, such as satellite positioning. _(Boolean)_
            // timeout: The maximum length of time (milliseconds) that is allowed to pass from the call to `navigator.geolocation.getCurrentPosition` or `geolocation.watchPosition` until the corresponding `geolocationSuccess` callback executes. If the `geolocationSuccess` callback is not invoked within this time, the `geolocationError` callback is passed a `PositionError.TIMEOUT` error code. (Note that when used in conjunction with `geolocation.watchPosition`, the `geolocationError` callback could be called on an interval every `timeout` milliseconds!) _(Number)_

                maximumAge:1000//Accept a cached position whose age is no greater than the specified time in milliseconds. _(Number)_
            }
            
            navigator.geolocation.getCurrentPosition(onSuccess, onError, geolocationOpts);
        }

        return geolocation;
     };


    GeolocationFactory.$inject = ['$http','$log'];

    angular.module('photoApp').factory('GeolocationFactory', GeolocationFactory);
}());
