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
            console.log($element,attrs);
            angular.element($window).bind('scroll', function(){
                console.log(this.pageYOffset);
                $scope.scrollDetect = this.pageYOffset > 100;
                $scope.$apply();
            });
        }
    }
})();
