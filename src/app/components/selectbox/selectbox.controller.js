(function() {
    'use strict';

    angular
        .module('app')
        .directive('selectbox', selectbox);

    /* @ngInject */
    function selectbox() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/selectbox/selectbox.tmpl.html',
            replace: false,
            scope: {
                search: '=',
                icon: '=',
                placeholder: '@',
                output: '=',
                options: '=',
                required: '='
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {
            $scope.selectOption = function(index) {
                $scope.output = $scope.options[index];
                console.log(index,$scope.options[index]);
            }

            $scope.mobileAction = function(){
                if($scope.isMobile){
                    angular.element('.mobile-selector').trigger('focus');
                    return false;
                }
                else return false;
            }
        }
        function controller($rootScope, $scope, $element) {
            $scope.isMobile = $rootScope.deviceInfo.isMobile;
        }
    }
})();
