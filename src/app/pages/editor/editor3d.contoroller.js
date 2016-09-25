(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', Editor3dController);

    /** @ngInject */
    function Editor3dController($rootScope, $scope, $filter, $compile ,$timeout, modelLoadService, get3dMaps, get2dMaps) {
        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;

        // CONFIG...
        vm.editorSet = '3d';

        // WEBGL SETTING...
        vm.scene = new THREE.Scene();
        vm.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });

        vm.selectedMaterial = undefined;
        vm.uploadedMaterials = [];
        vm.model = null;
        vm.maps = {
            _3d: get3dMaps.data,
            _2d: get2dMaps.data
        };
        vm.selectedMapData = {
            type: '3d',
            index: 0,
            color: '#222222'
        };
        vm.selectedLight = [];
        $scope.$watch('vm.selectedMapData',function(newValue,oldValue) {
            if(vm.selectedMapData && vm.selectedMapData.type === '3d') {
                vm.selectedMap = vm.maps._3d[vm.selectedMapData.index];
                vm.selectedMapColor = undefined;
            }
            else if(vm.selectedMapData && vm.selectedMapData.type === '2d') {
                vm.selectedMap = vm.maps._2d[vm.selectedMapData.index];
                vm.selectedMap.color = vm.selectedMapData.color;
            }
            console.log(vm.selectedMap);
        });
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
                    directive: '<light-tool scene="vm.scene" renderer="vm.renderer" output="vm.selectedLight"></light-tool>'
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
                subTools: [{
                    name: 'presets',
                    category: 'tab',
                    directive: '<map-tool scene="vm.scene" renderer="vm.renderer" output="vm.selectedMapData" maps="vm.maps"></map-tool>'
                }]
            }]
        };
        vm.toolEnabled = {};
        // CONFIG...

        vm.init = init;

        function init(){
            $timeout(function(){
                bindSubTools(vm.config.tools);
            });
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
            console.log(file);
            if(file){
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onloadend = function() {
                    var contents = reader.result;
                    var object = modelLoadService.combine(new THREE.OBJLoader().parse(contents));
                    object.name = 'mainObject';
                    vm.model = object;
                    
                    $scope.$apply();

                    vm.init();
                };
            }
        };
    }
})();
