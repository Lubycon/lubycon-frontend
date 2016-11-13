(function() {
    'use strict';

    angular
        .module('app')
        .directive('loadingIcon', loadingIcon);

    /* @ngInject */
    function loadingIcon() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/loading_icon/loading_icon.tmpl.html',
            replace: false,
            scope: {
                icon: '@'
            },
            link: link,
            controller: [
                '$scope', '$element',
                controller
            ]
        };

        return directive;

        function link($scope, $element) {

        }
        function controller($scope, $element){

        }
    }
})();
