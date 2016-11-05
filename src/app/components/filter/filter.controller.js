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
            scope: {
                filters: '=',
                submit: '='
            },
            //transclude: true,
            link: link,
            controller: [
                '$rootScope', '$scope', '$element', controller
            ]
        };

        return directive;

        function link($scope, $element) {
            console.log($scope.filters);
            $scope.isOpen = false;
            $scope.optionComponent = $element.find('.filter-dropdown');

            var distance = $scope.optionComponent.outerWidth();

            // Component will be hidden
            hideComponent();

            $scope.toggleAction = function() {
                $scope.isOpen = !$scope.isOpen;

                if($scope.isOpen) showComponent();
                else hideComponent();
            };

            function showComponent() {
                $scope.optionComponent.css('left',0);
            }

            function hideComponent() {
                $scope.optionComponent.css('left',distance * -1 + 'px');
            }
        }
        function controller($rootScope, $scope, $element) {
            $scope.isMobile = $rootScope.deviceInfo.isMobile;
        }
    }
})();
