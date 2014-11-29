(function(){

     var GeolocationFactory = function($http, $log) {

        var geolocation = {};

        geolocation.getPosition = function() {

            // onSuccess Callback
            // This method accepts a Position object, which contains the
            // current GPS coordinates
            var onSuccess = function(position) {
              /*  alert('Latitude: '          + position.coords.latitude          + '\n' +
                      'Longitude: '         + position.coords.longitude         + '\n' +
                      'Altitude: '          + position.coords.altitude          + '\n' +
                      'Accuracy: '          + position.coords.accuracy          + '\n' +
                      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                      'Heading: '           + position.coords.heading           + '\n' +
                      'Speed: '             + position.coords.speed             + '\n' +
                      'Timestamp: '         + position.timestamp                + '\n');
            */
            $log.info("Lon:"+position.coords.longitude+",Lat:"+position.coords.latitude);
            //Converti in strada http://nominatim.openstreetmap.org/reverse?format=json&lat="+position.coords.latitude+"&lon=-83.952"+position.coords.longitude
                /* esempio di output:
                {"place_id":"134561514","licence":"Data \u00a9 OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"225398888","lat":"35.9582749","lon":"-83.9520962","display_name":"North Concord Street, Knoxville, Knox County, Tennessee, 37919, Stati Uniti d'America","address":{"road":"North Concord Street","city":"Knoxville","county":"Knox County","state":"Tennessee","postcode":"37919","country":"Stati Uniti d'America","country_code":"us"}}*/
                
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
                  });
                
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
