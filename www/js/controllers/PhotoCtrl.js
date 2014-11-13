(function(){
    
    var PhotoCtrl = function($scope,PhotoFactory) {
        
        var options = {
            //options
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        };
        
        $scope.getPhoto = function() {
            console.log('Getting camera');
     
            PhotoFactory.getPicture( ).then(function(imageURI) {
                console.log(imageURI);

                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageURI;

                $scope.lastPhoto = imageURI;
                }, function(err) {
                  console.err(err);
                })
        }
    };
    
 
    PhotoCtrl.$inject = ['$scope','PhotoFactory'];
    
    angular.module('photoApp').controller('PhotoCtrl', PhotoCtrl);
    
}());