(function() {
    'use strict';

    angular
        .module('app')
        .directive('materialSelector', materialSelector);

    /* @ngInject */
    function materialSelector() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/3d/material/material.tmpl.html',
            scope: {
                scene: '=',
                renderer: '=',
                output: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            var object = $scope.scene.getObjectByName('mainObject');
            $scope.materialList = [];

            for(var i = 0; i < object.material.materials.length; i++) {
                $scope.materialList.push(object.material.materials[i].name);
            }

            $scope.output = $scope.materialList[0]; // TESTING....

            // GET SELECTED MATERIAL
            $scope.output = object.material.materials[0];

            $scope.changeEvent = function(index,item) {
                console.log(index,item);
                $scope.output = object.material.materials[index];
                console.log('SELECTED MATERIAL IS : ',$scope.output);
            };
        }
        function controller($rootScope, $scope, $element) {
            console.log($scope.scene,$scope.renderer);

        }
    }
})();
