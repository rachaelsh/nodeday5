angular.module("carsApp").controller("mainCtrl", function($scope, mainServ, $state){
$scope.loginUser = function(user){
  console.log(user);
mainServ.loginUser(user)
  .then(function(response){
    mainServ.getCurrentUser()
      .then(function(response){
        $scope.currentUser = response;
        $state.go("home");//this routes you to home or wherever
      })
  })

}
});
