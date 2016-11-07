angular.module("carsApp").service("mainServ", function($http){
this.loginUser = function(user){
  return $http({
    method: "POST",
    url: "/login",
    data: user
  }).then(function(response){
    return response.data;
  })
};
this.getCurrentUser = function(user){
return $http({
  method: "GET",
  url: "/current"
}).then(function(response){
  return response.data;

});

};



});
