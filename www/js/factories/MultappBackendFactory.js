(function(){

     var MultappBackendFactory = function($http,$log) {

        var multapp = {};

        multapp.sendPhoto = function(jsonData) {

            var req = {
                 method: 'POST',
                //TEST from device 
                url: 'http://192.168.1.10:3000/multapp/create',
                 //url: 'http://localhost:3000/multapp/create',
                 headers: {
                      'Content-Type': "application/json"
                 },
                 data:jsonData
            };

            return $http(req);

            /*return $http.post(
                'http://localhost:3000/multapp/create',
                ')]}\','+JSON.stringify(jsonData));*/
                /*$http({
                    method:'POST',
                    url:'http://localhost:3000/multapp/create',
                    data:JSON.stringify(jsonData),
                    headers:{
                       'Content-Type':'application/json'
                    }
                });*/
        }

        return multapp;
     }


    MultappBackendFactory.$inject = ['$http','$log'];

    angular.module('photoApp').factory('MultappBackendFactory', MultappBackendFactory);
}());
