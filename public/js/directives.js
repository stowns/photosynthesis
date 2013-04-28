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
          url: "/upload",
          maxFilesize: 100,
          paramName: "uploadfile",
          maxThumbnailFilesize: 5
      });
    }
  });

angular.module('dropZone', []).directive('dropZone', function() {
  return function(scope, element, attrs) {
    element.dropzone({ 
        url: "/upload",
        maxFilesize: 100,
        paramName: "uploadfile",
        maxThumbnailFilesize: 5
    });
  }
});
