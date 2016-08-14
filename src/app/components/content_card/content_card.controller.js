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
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {

        }
        function controller($scope, $element, API_CONFIG){
            $scope.contentHost = API_CONFIG.content;
        }
    }
})();
