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
                material: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.materialList = [];

            // WHEN 3D OBJECT IS UPLOADED...
            $scope.$watch(function() {
                return $scope.scene.existMainObject;
            },function(newValue,oldValue){
                if(newValue) {
                    $scope.object = $scope.scene.getObjectByName('mainObject');

                    // BIND MATERIALS...
                    for(var i = 0; i < $scope.object.material.materials.length; i++) {
                        $scope.materialList.push($scope.object.material.materials[i].name);
                    }

                    $scope.selectedMaterial = $scope.materialList[0]; // TESTING....

                    // GET SELECTED MATERIAL
                    $scope.material = $scope.object.material.materials[0];
                }
            },true);

            $scope.changeEvent = function(index,item) {

                $scope.material = $scope.object.material.materials[index];
            };
        }
        function controller($rootScope, $scope, $element) {
            console.log($scope.scene,$scope.renderer);

        }
    }
})();
