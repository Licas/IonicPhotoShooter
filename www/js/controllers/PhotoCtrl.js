(function(){
    
    var PhotoCtrl = function($scope, $http, $log, PhotoFactory, MultappBackendFactory,GeolocationFactory) {
        'use strict';
        var self = this;
        $scope.info = false;
        $scope.error = false;     
        
       //TEST
        $scope.lastPhoto = "img/ionic.png";
        //$scope.lastPhoto = "";
        
        $scope.dataPackage = {
                    id:'me',
                    email:'test.serializer@gmail.com',
                    password:'foobar',
                    image:''
        };

        
        $scope.getPhoto = function() {
            $scope.info = false;
            $scope.error = false;
            
            $log.info('Getting camera');
     
            PhotoFactory.getPicture().then(
               function(imageURI) {
                    $scope.lastPhoto = imageURI;

                    var thePhotoData = self.getBase64FromImageUrl(
                        $scope.lastPhoto,
                        function (data){
                            $scope.dataPackage.image = data;
                            //alert($scope.dataPackage.image);
                            $log.info("Data package:"+$scope.dataPackage.image);
                    });

                    $scope.error = false;
                    $scope.info = true;
                    $scope.message = "Foto scattata correttamnte. Adesso procedi con l'invio!";
                   
                },function(error){
                    $scope.error = true;
                    $scope.info = false;
                    $scope.message = "Errore durante lo scatto della foto. Si prega di riprovare.";
                });
        };
        
        $scope.clearPhoto = function() {
            $scope.lastPhoto = " ";
            $scope.error = false;
            $scope.info = false;
        };        

        $scope.sendPhoto = function() {
             GeolocationFactory.getPosition();
            
            var promise = MultappBackendFactory.sendPhoto($scope.dataPackage);

            promise.then(
                function(payload) {
                   $log.info("Successfully received response: " + JSON.stringify(payload.data));
                    $scope.clearPhoto();
                    $scope.info = true;
                    $scope.message = "Segnalazione inviata correttamente. Grazie!";
                    $scope.error = false;
                },
                function (errorPayload) {
                    $log.error("Error received:" + errorPayload);
                    $scope.info = false;
                    $scope.error = true;
                    $scope.message = "E' stato impossibile inviare la segnalazione: "+errorPayload;
                });
        };

            
        self.getBase64FromImageUrl = _getBase64FromImageUrl;
        
        function _getBase64FromImageUrl(URL,callback) {
            var img = new Image();
            img.src = URL;
            img.onload = function () {
                var dataURL = "";
                var canvas = document.createElement("canvas");
                canvas.width =this.width;
                canvas.height =this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);

                dataURL = canvas.toDataURL("image/png");
                dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                callback(dataURL);
            }
        };
    };
    
 
    PhotoCtrl.$inject = ['$scope','$http', '$log', 'PhotoFactory','MultappBackendFactory','GeolocationFactory'];
    
    angular.module('photoApp').controller('PhotoCtrl', PhotoCtrl);
    
}());
