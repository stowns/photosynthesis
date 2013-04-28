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

$("#dropzone").dropzone({
    url: 'Home/UploadFiles',
    paramName: "files", // The name that will be used to transfer the file
    maxFilesize: 102, // MB
    enqueueForUpload: false,
    accept: function (file, done) {
        angular.element(document.getElementById('result')).scope()
            .$apply(function (scope) {
                scope.product.PhotoName = $('#result').val();
            });

        return done();
    }
});

function uploadClicked() {
    var dz = Dropzone.forElement("#dropzone");
    for (var i = 0; i < dz.files.length; i++) {
        dz.filesQueue.push(dz.files[i]);
    }
    dz.processQueue(dz);
    $('#innerQue').empty();
}