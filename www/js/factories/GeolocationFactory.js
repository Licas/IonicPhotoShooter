(function(){

     var GeolocationFactory = function($http, $log) {

        var geolocation = {};

        geolocation.getPosition = function() {

            // onSuccess Callback
            // This method accepts a Position object, which contains the
            // current GPS coordinates
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
            };

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

        return geolocation;
     };


    GeolocationFactory.$inject = ['$http','$log'];

    angular.module('photoApp').factory('GeolocationFactory', GeolocationFactory);
}());
