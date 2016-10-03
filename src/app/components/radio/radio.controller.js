(function() {
    'use strict';

    angular
        .module('app')
        .directive('radio', radio);

    /* @ngInject */
    function radio() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/radio/radio.tmpl.html',
            replace: true,
            scope: {
                output: '=',
                value: '=',
                label: '@',
                theme: '@?'
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            if(angular.isUndefined($scope.theme)) $scope.theme = 'white';

            $scope.$watch('output',function(newValue,oldValue){
                console.log(oldValue,'=>',newValue);
            });
        }
        function controller($rootScope, $scope, $element, $attrs, $timeout) {

        }
    }
})();
