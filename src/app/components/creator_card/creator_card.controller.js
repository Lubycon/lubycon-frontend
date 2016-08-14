(function() {
    'use strict';

    angular
        .module('app')
        .directive('creatorCard', creatorCard);

    /* @ngInject */
    function creatorCard() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/creator_card/creator_card.tmpl.html',
            replace: true,
            scope: {
                creators: '='
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {
            console.log($scope.creators);
        }
        function controller($scope, $element, API_CONFIG) {
            $scope.contentHost = API_CONFIG.content;
        }
    }
})();
