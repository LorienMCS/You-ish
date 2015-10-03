var app = angular.module('youishApp', ['ngRoute', 'angularMoment', 'ngAnimate']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'YouishController'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutController'
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactController'
    }).otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});