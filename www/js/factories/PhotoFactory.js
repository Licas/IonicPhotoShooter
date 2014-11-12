(function(){
    
    var PhotoFactory = function($q) {
        
        var factory = {};
        
        factory.getPicture = function(options) {
          var q = $q.defer();

          navigator.camera.getPicture(function(result) {
            // Do any magic you need
            q.resolve(result);
          }, function(err) {
            q.reject(err);
          }, options);

          return q.promise;
        }
    
        return factory;
    };
 
    PhotoFactory.$inject = ['$q'];
    
    angular.module('photoApp').factory('PhotoFactory', PhotoFactory);
    
}());