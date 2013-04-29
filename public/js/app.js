'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ui.bootstrap', 'ngResource', 'google-maps']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/about', {templateUrl: 'partials/about', controller: AboutCtrl });
    $routeProvider.when('/contact', {templateUrl: 'partials/contact', controller: ContactCtrl });
    $routeProvider.when('/event/:slug', {templateUrl: 'partials/event', controller: EventCtrl });
    $routeProvider.when('/', {templateUrl: 'partials/home', controller: HomeCtrl });
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);

function uploadClicked() {
    var dz = Dropzone.forElement("#dropzone");
    for (var i = 0; i < dz.files.length; i++) {
        dz.filesQueue.push(dz.files[i]);
    }
    dz.processQueue(dz);
    $('#innerQue').empty();
}