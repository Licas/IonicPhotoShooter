(function(){
    
    var PhotoCtrl = function($scope,$http,PhotoFactory) {
        $scope.lastPhoto = "img/ionic.png";
        
          var  data = {
                id: 4,
                image: $scope.lastPhoto,
                location: {
                    lon: 44,
                    lat: 44,
                    address: ""
                }
            };
        
        $scope.getPhoto = function() {
            console.log('Getting camera');
     
            PhotoFactory.getPicture().then(function(imageURI) {
                $scope.lastPhoto = imageURI;
                            
                }, function(err) {
                  console.err("###Error in getting photo: " +err);
                })
        };
        
        $scope.clearPhoto = function() {
             $scope.lastPhoto = " ";
       };
        
        
Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + obj[key]);
    }
    return p.join('&');
};

        var sampleData = {user:{
                          email:"test.serializer@gmail.com",
                          password:"foobar"
                        }};
        
        $scope.sendPhoto = function() {
            /*$http({
                    method:"POST",
                    url: 'http://localhost:3000/multapp/send/photo',
                    data: Object.toparams(sampleData),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })*/
            $http({
                method:'POST',
                url:'http://localhost:3000/multapp', 
                data: Object.toparams(sampleData),
                headers:{
                   'Content-Type':'application/json;charset=UTF-8'
                }
            })
            .success(function (data, status, headers, config) {
               console.log("Successfully received response: " + data);
            }).error(function (data, status, headers, config) {
                console.log("Error received:" + data);
            });
        };        
        
    };
    
 
    PhotoCtrl.$inject = ['$scope','$http','PhotoFactory'];
    
    angular.module('photoApp').controller('PhotoCtrl', PhotoCtrl);
    
}());