(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', Editor3dController);

    /** @ngInject */
    function Editor3dController($rootScope, $scope, $filter, $compile ,$timeout) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;

        // CONFIG...
        vm.editorSet = '3d';

        // WEBGL SETTING...
        vm.scene = new THREE.Scene();
        vm.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });

        vm.selectedMaterial = undefined;
        vm.uploadedMaterials = [];
        vm.model = {};
        // WEBGL SETTING...

        vm.config = {
            headerTools: [{
                name: 'fileUpload',
                icon: 'fa-folder'
            }],
            tools: [{
                name: 'lightTool',
                type: 'open',
                icon: 'fa-lightbulb-o',
                subTools: [{
                    name: 'lights',
                    category: 'switch',
                    directive: '<light-tool scene="vm.scene" renderer="vm.renderer"></light-tool>'
                }]
            },{
                name: 'geometryTool',
                type: 'open',
                icon: 'fa-cube',
                subTools: [{
                    name: 'rotate',
                    category: 'switch',
                    directive: '<rotate-tool scene="vm.scene" renderer="vm.renderer"></rotate-tool>'
                },{
                    name: 'reset',
                    category: 'buttons',
                    directive: '<rotate-reset-tool scene="vm.scene" renderer="vm.renderer"></rotate-reset-tool>'
                },{
                    name: 'mode',
                    category: 'buttons',
                    directive: '<view-mode-tool scene="vm.scene" renderer="vm.renderer"></view-mode-tool>'
                }]
            },{
                name: 'materialTool',
                type: 'open',
                icon: 'fa-square',
                subTools: [{
                    name: 'materials',
                    category: 'selectbox',
                    directive: '<material-selector scene="vm.scene" renderer="vm.renderer" output="vm.selectedMaterial"></material-selector>'
                },{
                    name: 'diffuse',
                    category: 'tab',
                    directive: '<diffuse-tool scene="vm.scene" renderer="vm.renderer" output="vm.selectedMaterial" textures="vm.uploadedMaterials"></diffuse-tool>'
                },{
                    name: 'specular',
                    category: 'tab',
                    directive: '<specular-tool scene="vm.scene" renderer="vm.renderer" output="vm.selectedMaterial" textures="vm.uploadedMaterials"></specular-tool>'
                },{
                    name: 'normal',
                    category: 'tab',
                    directive: '<normal-tool scene="vm.scene" renderer="vm.renderer" output="vm.selectedMaterial" textures="vm.uploadedMaterials"></normal-tool>'
                }]
            },{
                name: 'mapTool',
                type: 'open',
                icon: 'fa-picture-o',
                subTools: []
            }]
        };
        vm.toolEnabled = {};
        // CONFIG...

        vm.init = init;

        function init(){
            $timeout(function(){
                bindSubTools(vm.config.tools);
            },0);
        }

        function bindSubTools(tools){
            console.log(tools);
            for(var i = 0; i < tools.length; i++){
                var subTools = tools[i].subTools;
                if(subTools.length > 0){
                    for(var j = 0; j < subTools.length; j++){
                        var target = angular.element(document).find('.sub-tools[data-value="'+subTools[j].name+'"]');
                        subTools[j].directive = $compile(subTools[j].directive)($scope);
                        subTools[j].directive.appendTo(target);
                    }
                }
            }
        }

        vm.toolboxToggle = function(name){
            var keys = Object.keys(vm.toolEnabled);
            for(var i = 0; i < keys.length; i++){
                if(keys[i] === name) continue;
                vm.toolEnabled[keys[i]] = false;
            }
            if(!vm.toolEnabled[name]) vm.toolEnabled[name] = true;
            else vm.toolEnabled[name] = false;

            // REFRESH SLIDER VALUE
            $timeout(function () { $scope.$broadcast('rzSliderForceRender'); });
        };

        vm.changedFile = function(files,file,newFile,invalideFiles) {
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onloadend = function() {
                var contents = reader.result;
                var object = new THREE.OBJLoader().parse(contents);
                console.log(object);

                for(var i = 0; i < object.length; i++) {
                    var userData = object[i].userData;
                    var geometry = object[i].geometry;
                        geometry.center();
                    var material = object[i].material;

                    if(material.type === "MeshPhongMaterial"){
                        material.specular = new THREE.Color(0xffffff);
                        material.shininess = 100;
                        material.side = THREE.DoubleSide;
                        material.transparent = true;
                        material.needsUpdate = true;
                    }
                    else if(material.type === "MultiMaterial"){
                        var materials = material.materials;
                        for(var j = 0, ml = materials.length; j < ml; j++){
                            materials[j].specular = new THREE.Color(0xffffff);
                            materials[j].shininess = 100;
                            materials[j].side = THREE.DoubleSide;
                            materials[j].transparent = true;
                            materials[j].needsUpdate = true;
                            materials[j].dispose();
                        }
                    }
                    else $.error("WebGL failed loading to material");

                    var mesh = new THREE.Mesh(geometry,material);
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        mesh.scale.set(1,1,1);
                        mesh.initMatrix = mesh.matrixWorld.clone();
                        mesh.userData = userData;
                        mesh.name = 'mainObject';

                    vm.scene.add(mesh);
                } // end for

                console.log(vm.scene.existMainObject);

                vm.init();
            };

            console.log(files);
        };
    }
})();
