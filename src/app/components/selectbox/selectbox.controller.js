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
            replace: true,
            scope: {
                search: '=',
                icon: '=',
                placeholder: '@',
                output: '=',
                options: '=',
                required: '=',
                theme: '@'
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {
            $scope.isOpen = false;

            $scope.toggleAction = function(){
                $scope.isOpen = $scope.isOpen ? false : true;
            }
            $scope.selectOption = function(index) {
                $scope.output = $scope.options[index];
            };
            $scope.theme = $scope.theme ? $scope.theme : 'white';

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
