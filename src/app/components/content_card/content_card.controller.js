(function() {
    'use strict';

    angular
        .module('app')
        .directive('contentCard', contentCard);

    /* @ngInject */
    function contentCard() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/content_card/content_card.tmpl.html',
            replace: true,
            scope: {
                contents: '='
            },
            //transclude: true,
            link: link
        };

        return directive;

        function link($scope, $element) {
            console.log($scope.contents);
        }
    }
})();
