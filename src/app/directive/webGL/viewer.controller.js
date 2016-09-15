(function() {
    'use strict';

    angular
        .module('app')
        .directive('webglViewer', webglViewer);

    /* @ngInject */
    function webglViewer() {
        var directive = {
            restrict: 'EA',
            scope: {

            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {

        }
        function controller($rootScope, $scope, $element) {

        }
    }
})();
