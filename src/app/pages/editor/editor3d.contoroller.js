(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', Editor3dController);

    /** @ngInject */
    function Editor3dController(
        $rootScope, $scope, $filter, $compile ,$timeout, toastr,
        modelLoadService, FileControlService,
        get3dMaps, get2dMaps, getCategory, getCreativeCommons
    ) {

        var vm = this;
        vm.isMobile = $rootScope.deviceInfo.isMobile;

        // JSON DATA SETTING
        if(get3dMaps.status === 200 && get2dMaps.status === 200) {
            vm.maps = {
                _3d: get3dMaps.data,
                _2d: get2dMaps.data
            };
        }

        // CONFIG...
        vm.editorSet = '3d';

        // WEBGL SETTING...
        vm.scene = new THREE.Scene();
        vm.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });

        vm.selectedMaterial = undefined;
        vm.uploadedMaterials = [];
        vm.model = null;

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
        vm.cropping = false;

        vm.tags = [];
        vm.selectedCategories = [];
        vm.currentTag = null; // THIS VALUE IS USED FOR INPUT ELEMENT
        vm.creativeCommons = angular.copy(getCreativeCommons.data);
            vm.creativeCommons[0].disabled = true;
            vm.creativeCommons[4].disabled = true;
        vm.categories = getCategory.data.threed;
        //TESTING...
        vm.editorData = {};

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
                // THERE IS NO MATERIALS IN STL FILE...
                if(tools[i].name === 'materialTool' && vm.modelExtention === 'stl') continue;

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
                var loader;
                reader.readAsBinaryString(file);

                var extention = FileControlService.getExtention(file);
                vm.modelExtention = extention;

                reader.onloadend = function() {
                    var contents = reader.result;
                    var object;

                    switch(extention) {
                        case 'obj' : object = modelLoadService.combine(new THREE.OBJLoader().parse(contents)); break;
                        case 'stl' : object = modelLoadService.setMesh(new THREE.STLLoader().parse(contents)); break;
                        case 'fbx' : object = modelLoadService.combine(new THREE.FBXLoader().parse(contents)); break;
                        default : return false;
                    }

                    object.name = 'mainObject';
                    vm.model = object;
                    vm.uploadedMaterials = [];

                    $scope.$apply();

                    vm.init();
                };
            }
        };

        vm.capture = function() {
            console.time("capture");
            if(!vm.model) {
                toastr.error('You have to upload the 3D file first');
                return false;
            }

            if(vm.selectedMapData.type === '2d') {
                vm.renderer.setClearColor(vm.selectedMapData.color,1);
                $timeout(action,100);
            }
            else action();
        };
        function action() {
            var data = vm.renderer.domElement.toDataURL('image/jpeg',1);
            vm.capturedData = data;

            if(vm.selectedMapData.type === '2d') vm.renderer.setClearColor(0x222222,0);

            console.timeEnd('capture');
        }

        vm.crop = function() {
            vm.cropping = false;

            var canvas = angular.element('.cropper').cropper('getCroppedCanvas', { width: 640, height: 640 }),
                base64URI = canvas.toDataURL('image/jpeg');
            vm.thumbnail = base64URI;
            // GO TO SETTING STEP!!!!
        };

        vm.detectTag = function(event) {
            // MAX TEXT LENGTH = 20;
            if(event.which === 13 || event.which === 32) {
                vm.tags.push(vm.currentTag);
                vm.currentTag = null;
            }
        };

        vm.removeTag = function(index) {
            vm.tags.splice(index,1);
            console.log(vm.tags);
        };

        vm.changeCC = function(element,index) {
            console.log(vm.creativeCommons[index].check);
            if(vm.creativeCommons[index].check) {
                if(index === 3) vm.creativeCommons[4].disabled = true;
                else if(index === 4) vm.creativeCommons[3].disabled = true;
                else return false;
            }
            else {
                if(index === 3) vm.creativeCommons[4].disabled = false;
                else if(index === 4)  vm.creativeCommons[3].disabled = false;
                else return false;
            }
        };

        vm.postData = function() {
            vm.model = vm.model.toJSON();
            console.log(vm.model);


            vm.editorData = {
                attachedFiles: null, // DO
                attachedImg: null, // DO
                content: {
                    type: 1,
                    data: {
                        model: vm.model,
                        map: null, // DO
                        lights: [] // DO
                    }
                },
                setting: {
                    title: vm.title,
                    description: vm.description,
                    thumbnail: null,
                    category: null,
                    tags: vm.tags,
                    cc: {
                        ccUsed: null,
                        by: vm.creativeCommons[1].check,
                        nc: vm.creativeCommons[2].check,
                        nd: vm.creativeCommons[3].check,
                        sa: vm.creativeCommons[4].check
                    }
                }

            };
            console.log(vm.editorData);
            console.time('Data submit');
            console.timeEnd('Data submit');
        };
    }
})();
