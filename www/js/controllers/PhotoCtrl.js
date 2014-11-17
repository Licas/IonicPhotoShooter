(function(){
    
    var PhotoCtrl = function($scope,PhotoFactory) {
        console.log("Here in controller");
        
        $scope.getPhoto = function() {
            console.log('Getting camera');
     
            PhotoFactory.getPicture().then(function(imageURI) {
                $scope.lastPhoto = imageURI;
                            
               // var image = document.getElementById('myImage');
            //    image.src = "data:image/jpeg;base64," + imageURI;
                }, function(err) {
                  console.err(err);
                })
        };
        
        $scope.clearPhoto = function() {
            $scope.lastPhoto = null;
        };
        
        $scope.sendPhoto = function() {};        
        
    };
    
 
    PhotoCtrl.$inject = ['$scope','PhotoFactory'];
    
    angular.module('photoApp').controller('PhotoCtrl', PhotoCtrl);
    
}());