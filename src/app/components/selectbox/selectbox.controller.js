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
                theme: '@',
                selectedIndex: '=', // GET INDEX
                changeEvent: '='
            },
            //transclude: true,
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element) {
            console.log($scope);
            $scope.isOpen = false;

            // GET SELECTED INDEX...
            if($scope.selectedIndex > -1) $scope.output = $scope.options[$scope.selectedIndex];

            $scope.toggleAction = function(){
                $scope.isOpen = $scope.isOpen ? false : true;
            };
            $scope.selectOption = function(index) {
                $scope.output = $scope.options[index];
                console.log("select box : ", $scope.output);
            };
            $scope.theme = $scope.theme ? $scope.theme : 'white';

            $scope.mobileAction = function(){
                if($scope.isMobile){
                    angular.element('.mobile-selector').trigger('focus');
                    return false;
                }
                else return false;
            };

            // TESTING...
            $scope.$watch(function() {
                return $scope.output;
            },function(newValue,oldValue) {
                if(!$scope.output) {
                    if($scope.selectedIndex > -1) $scope.output = $scope.options[$scope.selectedIndex];
                    console.log($scope.output);
                }
            });
        }
        function controller($rootScope, $scope, $element) {
            $scope.isMobile = $rootScope.deviceInfo.isMobile;
        }
    }
})();
