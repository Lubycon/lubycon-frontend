(function() {
    'use strict';

    angular
        .module('app')
        .directive('filter', filter);

    /* @ngInject */
    function filter() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/filter/filter.tmpl.html',
            replace: true,
            scope: {
                filters: '=',
                submit: '='
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {
            $scope.isOpen = false;

            $scope.toggleAction = function() {
                $scope.isOpen = $scope.isOpen ? false : true;
                console.log($scope.filters);
            };
        }
        function controller($rootScope, $scope, $element) {
            $scope.isMobile = $rootScope.deviceInfo.isMobile;
        }
    }
})();
