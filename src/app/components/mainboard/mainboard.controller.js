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
            link: link,
            controller: [
                '$scope', '$element', '$state', '$stateParams', controller
            ]
        };

        return directive;

        function link($scope, $element) {

        }
        function controller($scope, $element, $state, $stateParams) {
            $scope.boardCategory = $stateParams.category;
        }
    }
})();
