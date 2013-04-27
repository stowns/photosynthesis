'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/about', {templateUrl: 'partials/about', controller: AboutCtrl });
    $routeProvider.when('/contact', {templateUrl: 'partials/contact', controller: ContactCtrl });
    $routeProvider.when('/', {templateUrl: 'partials/home', controller: HomeCtrl });
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);