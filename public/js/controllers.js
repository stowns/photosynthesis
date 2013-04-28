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

function EventCtrl($scope) {

}
EventCtrl.$inject = ['$scope'];

function UploadCtrl($scope, $resource) {
  $scope.submit = function() {
    // create a collection, on success add these images
    var Album = $resource('/api/album/:name', { name : '@name' });

    var album = Album.save({ name:$scope.name }, function(a, putResponseHeaders) {
        //u => saved user object
        //putResponseHeaders => $http header getter
        console.log(a._id);

        var dz = Dropzone.forElement("#dropzone");
        dz.options.url = '/api/album/' + a._id + '/image'
        for (var i = 0; i < dz.files.length; i++) {
            dz.filesQueue.push(dz.files[i]);
        }
        dz.processQueue(dz);
        $('#innerQue').empty();
      });
    
  }
}
UploadCtrl.$inject = ['$scope', '$resource'];