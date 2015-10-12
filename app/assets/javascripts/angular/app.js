var app = angular.module('youishApp', ['ngRoute', 'angularMoment', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

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

}]);
