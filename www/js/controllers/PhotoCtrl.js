(function(){
    
    var PhotoCtrl = function($scope, $http, $log, PhotoFactory, MultappBackendFactory) {
        'use strict';
        var self = this;
        
       //TEST $scope.lastPhoto = "img/ionic.png";
         $scope.lastPhoto = "";
        var  data = {
                id: 4,
                image: $scope.lastPhoto,
                location: {
                    lon: 44,
                    lat: 44,
                    address: ""
                }
        };

        $scope.dataPackage = {
                    id:'me',
                    email:'test.serializer@gmail.com',
                    password:'foobar',
                    image:''
        };

        
        $scope.getPhoto = function() {
            console.log('Getting camera');
     
            PhotoFactory.getPicture().then(function(imageURI) {
                $scope.lastPhoto = imageURI;
                            
                var thePhotoData = self.getBase64FromImageUrl(
                                        $scope.lastPhoto,
                                        function (data){
                                            $scope.dataPackage.image = data;
                                            alert($scope.dataPackage.image);
                                            $log.info("Data package:"+$scope.dataPackage.image);
                                        });
                }, function(err) {
                  console.err("###Error in getting photo: " +err);
                })
        };
        
        $scope.clearPhoto = function() {
             $scope.lastPhoto = " ";
       };
        

        $scope.sendPhoto = function() {
            //$log.info("Sending:"+JSON.stringify($scope.dataPackage));
            var promise = MultappBackendFactory.sendPhoto($scope.dataPackage);

            promise.then(
                function(payload) {
                   $log.info("Successfully received response: " + JSON.stringify(payload.data));
                },
                function (errorPayload) {
                    $log.error("Error received:" + errorPayload);
                });
               /* .success(function (data, status, headers, config) {
                   console.log("Successfully received response: " + data);
                }).error(function (data, status, headers, config) {
                    console.log("Error received:" + data);
                });*/
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
    
 
    PhotoCtrl.$inject = ['$scope','$http', '$log', 'PhotoFactory','MultappBackendFactory'];
    
    angular.module('photoApp').controller('PhotoCtrl', PhotoCtrl);
    
}());
