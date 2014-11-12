angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('PhotoCtrl', function($scope, PhotoFactory) {

  $scope.getPhoto = function() {
    console.log('Getting camera');
    PhotoFactory.getPicture().then(function(imageURI) {
        $log.log(imageURI);
        $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    },  
    {  //options
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
    });
  };
 
});
