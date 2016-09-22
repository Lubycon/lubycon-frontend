(function() {
    'use strict';

    angular
        .module('app')
        .directive('mapTool', mapTool);

    /* @ngInject */
    function mapTool() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/3d/map/map.tmpl.html',
            scope: {
                scene: '=',
                renderer: '=',
                output: '=',
                maps: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            console.log($scope.maps,$scope.output);

            $scope.selectedTab = '3d';
            $scope.mapColor = '#222222';
            $scope.output = {
                type: $scope.selectedTab,
                index: 0,
                color: $scope.mapColor
            };

            var _2dMapList = $scope.maps._2d.map(function(v) { return v.name; });
            var _3dMapList = $scope.maps._3d.map(function(v) { return v.name; });
            $scope.mapList = {
                _3d: _3dMapList,
                _2d: _2dMapList
            };
            console.log($scope.mapList);
            // CONFIG....
        }
        function controller($rootScope, $scope, $element, $timeout, $uibModal) {

            $scope.changeMap = function(index,value){
                $scope.output = {
                    type: $scope.selectedTab,
                    index: index,
                    color: $scope.mapColor
                };
            };
            $scope.changeColor = function(color){
                $scope.output = {
                    type: $scope.selectedTab,
                    index: $scope.output.index,
                    color: color
                };
            };
            $scope.tabAction = function(value) {
                $scope.selectedTab = value;
                $scope.output = {
                    type: $scope.selectedTab,
                    index: 0,
                    color: $scope.mapColor
                };
            };
        }
    }
})();