(function() {
    'use strict';

    angular
        .module('app')
        .directive('diffuseTool', diffuseTool);

    /* @ngInject */
    function diffuseTool() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/3d/material/diffuse.tmpl.html',
            scope: {
                scene: '=',
                renderer: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.testModel = 10;
        }
        function controller($rootScope, $scope, $element) {
            console.log($scope.scene,$scope.renderer,$element);

            // $scope.object = $scope.scene.getObjectByName('mainObject');
            // $scope.materialList = $scope.object.material.materials;
        }
    }
})();
