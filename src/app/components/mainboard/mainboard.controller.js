(function() {
    'use strict';

    angular
        .module('app')
        .directive('mainboard', contentCard);

    /* @ngInject */
    function contentCard() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/mainboard/mainboard.tmpl.html',
            replace: true,
            scope: {
                lists: '='
            },
            //transclude: true,
            link: link
        };

        return directive;

        function link($scope, $element) {
            console.log($scope);
        }
    }
})();
