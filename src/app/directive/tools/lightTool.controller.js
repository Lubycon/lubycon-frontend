(function() {
    'use strict';

    angular
        .module('app')
        .directive('lightTool', lightTool);

    /* @ngInject */
    function lightTool() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/lightTool.tmpl.html',
            scope: {
                scene: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {

        }
        function controller($rootScope, $scope, $element) {
            'use stict';

            console.log('light tool is loaded',$scope.scene);
        }
    }
})();
