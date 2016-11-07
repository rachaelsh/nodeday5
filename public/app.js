angular.module("carsApp", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state("login", {
    url: "/login",
    templateUrl: "./templates/login.html"
  }).state("home", {
    url: "/",
    templateUrl: "./templates/home.html"
  });
$urlRouterProvider.otherwise("/login");
})
