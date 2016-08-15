(function() {
    'use strict';

    angular
        .module('app')
        .directive('scrollEvent', contentCard);

    /* @ngInject */
    function contentCard($window) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link($scope, $element, attrs) {
            angular.element($window).bind('scroll', function(){
                $scope.scrollDetect = this.pageYOffset > 100;
                $scope.$apply();
            });
        }
    }
})();
