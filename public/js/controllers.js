'use strict';

/* Controllers */
function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
}

function HomeCtrl($scope) {
  $scope.content = 'this is the home page';
}
HomeCtrl.$inject = ['$scope'];

function AboutCtrl($scope) {
  $scope.content = 'this is the about page'
}
AboutCtrl.$inject = ['$scope'];

function ContactCtrl($scope) {
  $scope.content = 'this is the contact page'
}
ContactCtrl.$inject = ['$scope'];