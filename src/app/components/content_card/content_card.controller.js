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
            console.log($scope.contents);
        }
        function controller($scope, $element, Restangular, toastr, API_CONFIG){
            $scope.contentHost = API_CONFIG.content;

            $scope.bookmarkAction = bookmarkAction;

            function bookmarkAction(item){
                // BOOKMARK CHECKING...
                if(item.bookmark) { // OFF
                    item.bookmark = false;
                    toastr.success(item.title+' is removed at your bookmark',{
                        iconClass: 'toast-remove'
                    });
                }
                else if(!item.bookmark) { // ON
                    item.bookmark = true;
                    toastr.success(item.title+' is saved to your bookmark',{
                        iconClass: 'toast-bookmark'
                    });
                }
                else return false;
                // BOOKMARK CHECKING END
                // CREATE POST PARAM
                var params = {
                    checked: item.bookmark,
                    getUserCode: item.userData.code
                    //giveUserCode: $rootScope.member.code // 미구현
                };

                console.log(params);

                // POST TO SERVER...
                // Restangular.all('bookmark/contents/3d' + item.code)
                //     .customPOST(params, undefined, undefined, {'Content-Type':'application/json'})
                //     .then(function(res){
                //
                //     });
            }
        }
    }
})();
