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
                comments: '=',
                getMember: '='
            },
            //transclude: true,
            link: link,
            controller: [
                '$rootScope', '$scope', '$element', 'Restangular', 'toastr',
                'UserActionService', '$stateParams', '$window',
                controller
            ]
        };

        return directive;

        function link($scope, $element) {

        }
        function controller(
            $rootScope, $scope, $element, Restangular, toastr,
            UserActionService, $stateParams, $window
        ){
            $scope.me = $rootScope.member;
            $scope.isActiveUser = $scope.me && $rootScope.memberState.condition === 'active';

            if($scope.comments) {
                $scope.comments.map(function(v){
                    v.date = v.date.split(" ")[0];
                });
            }

            $scope.myComment = null;

            $scope.commentSubmit = function() {
                UserActionService.post([
                    'comments',
                    $stateParams.category,
                    $stateParams.id
                ],{
                    content: $scope.myComment,
                    getUserId: $scope.getMember
                }).then(function(res) {
                    console.log(res);
                    if(res.status.code === '0000') {
                        $window.location.reload();
                    }
                });
            };
        }
    }
})();
