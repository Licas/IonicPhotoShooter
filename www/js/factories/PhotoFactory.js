(function(){
    
    var PhotoFactory = function($q,$log) {
        
        var factory = {};
        
        factory.getPicture = function() {
          
          var options = {
          //options
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG
          };  
          
            var q = $q.defer();

            
          navigator.camera.getPicture(function(result) {
            // Do any magic you need
            q.resolve(result);
              $log.error(result);
          }, function(err) {
            q.reject(err);
          }, options);

          return q.promise;
        };
        
        return factory;
    };
 
    PhotoFactory.$inject = ['$q','$log'];
    
    angular.module('photoApp').factory('PhotoFactory', PhotoFactory);
    
}());