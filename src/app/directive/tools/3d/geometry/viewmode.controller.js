(function() {
    'use strict';

    angular
        .module('app')
        .directive('viewModeTool', viewModeTool);

    /* @ngInject */
    function viewModeTool() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/tools/3d/geometry/viewmode.tmpl.html',
            scope: {
                scene: '=',
                renderer: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {

        }
        function controller($rootScope, $scope, $element) {
            // console.log($scope.scene,$scope.renderer);

            $scope.modeChange = function(mode) {
                $scope.object = $scope.scene.getObjectByName('mainObject');
                $scope.material = $scope.object ? $scope.object.material : null;
                $scope.materials = $scope.material.materials;
                console.log($scope.object,$scope.material);
                switch(mode){
                    case 'realistic' :
                        materialViewControl(true);
                        xrayViewControl(false);
                        wireframeViewControl(false);
                    break;
                    case 'clean' :
                        materialViewControl(false);
                        xrayViewControl(false);
                        wireframeViewControl(false);
                    break;
                    case 'transparent' :
                        materialViewControl(false);
                        xrayViewControl(true);
                        wireframeViewControl(false);
                    break;
                    case 'wireframe' :
                        materialViewControl(false);
                        xrayViewControl(false);
                        wireframeViewControl(true,false);
                    break;
                    case 'wireclean' :
                        materialViewControl(false);
                        xrayViewControl(false);
                        wireframeViewControl(true,true);
                    break;
                    default: return false;
                }
            };

            function materialViewControl(bool) {
                if(bool){
                    for(var i = 0, l = $scope.materials.length; i < l; i++){
                        var textureIndex = $scope.materials[i].textureIndex;

                        if(textureIndex !== -1){
                            $scope.materials[i].map = loadedMaterials[textureIndex];
                            $scope.materials[i].needsUpdate = true;
                        }
                    }
                }
                else{
                    for(var i = 0, l = $scope.material.length; i < l; i++){
                        $scope.materials[i].map = null;
                        $scope.materials[i].needsUpdate = true;
                    }
                }
            }

            function xrayViewControl(bool) {
                if(bool){
                    for(var i = 0, ml = $scope.materials.length; i < ml; i++){
                        $scope.materials[i].opacity = 0.5;
                    }
                }
                else{
                    for(var i = 0, ml = $scope.materials.length; i < ml; i++){
                        $scope.materials[i].opacity = 1;
                    }
                }
            }

            function wireframeViewControl(bool,helper) {
                if(bool){
                    var exist = $scope.scene.getObjectByName("wireframeHelper");
                    if(!exist){
                        var wireframeHelper = new THREE.WireframeHelper($scope.object,0x48cfad);
                        wireframeHelper.name = "wireframeHelper";
                        $scope.scene.add(wireframeHelper);
                    }
                    if(!helper) $scope.material.visible = false;
                    else $scope.material.visible = true;
                }
                else{
                    $scope.material.visible = true;
                    $scope.scene.remove($scope.scene.getObjectByName("wireframeHelper"));
                }
            }
        }
    }
})();
