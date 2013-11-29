angular.module('myapp',['ngResource']);

angular.module('myapp').controller('SendCtrl', function($scope, $http){

  $scope.message = "";

  $scope.sendToGlass = function(){
    $http.post('/send2', {message:$scope.message})
      .success(function(){
        $scope.sent = true;
        setTimeout(function(){
          $scope.sent = false;
        }, 3000);
      });
  }

});