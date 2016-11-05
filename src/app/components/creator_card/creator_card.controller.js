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
            controller: [
                '$scope', '$element', 'API_CONFIG', controller
            ]
        };

        return directive;

        function link($scope, $element) {
            $scope.menuList = [
                {
                    icon: 'fa-tachometer',
                    name: 'Dashboard',
                    url: 'aside.default.dashboard({memberId: member.code})'
                },
                {
                    icon: 'fa-eye',
                    name: 'Contents',
                    url: 'aside.default.dashboard({memberId: member.code})'
                },
                {
                    icon: 'fa-bar-chart',
                    name: 'Insight',
                    url: 'aside.default.insight({memberId: member.code})'
                },
                {
                    icon: 'fa-table',
                    name: 'Forum',
                    url: 'aside.default.dashboard({memberId: member.code})'
                }
            ];

            $scope.toggleClick = function(member, event) {
                if(!member.selected ) {
                    initSelected();
                    member.selected = true;
                }
                else member.selected = false;

            };

            function initSelected(){
                // INIT MEMBER SELECT DATA...
                if($scope.creators){
                    for(var i = 0; i < $scope.creators.length; i++){
                        $scope.creators[i].selected = false;
                    }
                }
                else return false;
            }
        }
        function controller($scope, $element, API_CONFIG) {
            $scope.contentHost = API_CONFIG.content;
        }
    }
})();
