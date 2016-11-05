(function() {
    'use strict';

    angular
        .module('app')
        .directive('checkbox', checkbox);

    /* @ngInject */
    function checkbox() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/checkbox/checkbox.tmpl.html',
            replace: true,
            scope: {
                icon: '=?',
                output: '=',
                theme: '@?',
                disabled: '=?',
                label: '=',
                selectedIndex: '=', // GET INDEX
                changeEvent: '='
            },
            //transclude: true,
            link: link,
            controller: [
                '$rootScope', '$scope', '$element', '$attrs', '$timeout',
                controller
            ]
        };

        return directive;

        function link($scope, $element, $attrs) {
            if(angular.isUndefined($scope.theme)) $scope.theme = 'white';
            if(angular.isUndefined($scope.disabled)) $scope.disabled = false;

            $scope.$watch('output',function(){
                if($scope.changeEvent) $scope.changeEvent($element, $attrs.index ? $attrs.index * 1 : undefined);
            });
        }
        function controller($rootScope, $scope, $element, $attrs, $timeout) {

        }
    }
})();
