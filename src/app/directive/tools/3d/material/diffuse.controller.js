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
                renderer: '=',
                material: '='
            },
            link: link,
            controller: controller
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.object = $scope.scene.getObjectByName('mainObject');

            $scope.modelOpacity = 100;
            $scope.modelColor = '#' + $scope.object.material.materials[0].color.getHexString();
            console.log($scope.modelColor);

            $scope.uploadedTextures = [];

            $scope.sliderOptions = {
                floor: 0,
                ceil: 100,
                step: 1,
                showSelectionBar: true,
                onChange: $scope.changeOpacity
            };
        }
        function controller($rootScope, $scope, $element, $timeout, $uibModal, TextureService) {
            var object = $scope.scene.getObjectByName('mainObject');

            // TEXTURE METHOD
            $scope.modalOpen = function(size) {
                var instance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: true,
                    templateUrl: 'app/directive/tools/3d/textureUploader.tmpl.html',
                    size: size,
                    resolve: {
                        textures: function(){
                            return $scope.uploadedTextures;
                        },
                        type: function(){
                            return 'diffuse';
                        }
                    },
                    controller: 'textureUploaderController'
                });

                instance.result.then(function(res) {
                    console.log(res);
                    $scope.selectedTexture = res.selectedTexture;
                    $scope.uploadedTextures = res.textures;
                    $scope.bindMaterial(res.selectedTexture);
                });
            };

            $scope.bindMaterial = function(tex) {
                TextureService.get(tex,function(res){
                    $scope.material.map = res;
                    $scope.material.needsUpdate = true;
                });
            };

            // COLOR METHOD
            $scope.changeColor = function(color) {
                var textureColor = new THREE.Color(color);
                $scope.material.color = textureColor;
            };

            // OPACITY METHOD
            $scope.changeOpacity = function() {
                var opacity = $scope.modelOpacity * 0.01;

                if(object) $scope.material.opacity = opacity;
                else return false;
            };
        }
    }
})();
