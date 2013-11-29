angular.module('myapp',['ngResource']);

angular.module('myapp').controller('SendCtrl', function($scope, $http){

  $scope.message = "";

  $scope.sendToGlass = function(){
    $http.post('/send1', {
      title:$scope.title,
      message:$scope.message,
      html: $scope.html,
      speakableText: $scope.message
    })
      .success(function(){
        $scope.sent = true;
        setTimeout(function(){
          $scope.sent = false;
        }, 3000);
      });
  }

});