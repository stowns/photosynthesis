'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('dropZone', function() {
    return function(scope, element, attrs) {
      element.dropzone({ 
          url: "/placeholder",
          maxFilesize: 100,
          paramName: "image",
          maxThumbnailFilesize: 5,
          enqueueForUpload : false
      });
    }
  });