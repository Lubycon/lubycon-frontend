(function() {
    'use strict';

    angular
        .module('app')
        .directive('comment', comment);

    /* @ngInject */
    function comment() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/comment/comment.tmpl.html',
            replace: true,
            scope: {
                comments: '='
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {
            console.log($scope.contents);
        }
        function controller($scope, $element, Restangular, toastr, API_CONFIG){
            $scope.contentHost = API_CONFIG.content;

            $scope.comments.map(function(v){
                v.date = v.date.split(" ")[0];
            });
        }
    }
})();
