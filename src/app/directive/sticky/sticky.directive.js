(function() {
    'use strict';

    angular
    .module('app')
    .directive('sticky', sticky);

    /* @ngInject */
    function sticky() {
        var directive = {
            restrict: 'A',
            scope: {
                offset: '=',
                stickyClass: '@'
            },
            link: link,
            controller: [
                '$scope','$element','$attrs','$interval','$compile','$window',controller
            ]
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.limitValue = $element.offset().top - $scope.offset;
            $scope.stashedCSS = {
                position: $element.css('position'),
                top: $element.css('top')
            };

            console.log('limitValue : ',$scope.limitValue);
        }
        function controller(
            $scope, $element, $attrs, $interval, $compile, $window
        ) {
            angular.element($window).on('scroll', function() {
                var scrollTop = angular.element(this).scrollTop();
                var isSticky = detectScroll(scrollTop);

                if(isSticky) setSticky();
                else destroySticky();
            });

            function setSticky() {
                if($scope.stickyClass) $element.addClass($scope.stickyClass);
                $element.css({
                    'position': 'fixed',
                    'top': $scope.offset + 'px'
                });
            }

            function destroySticky() {
                if($scope.stickyClass) $element.removeClass($scope.stickyClass);
                $element.css({
                    'position': $scope.stashedCSS.position,
                    'top': $scope.stashedCSS.top
                });
            }

            function detectScroll(val) {
                return val >= $scope.limitValue;
            }
        }
    }
})();
