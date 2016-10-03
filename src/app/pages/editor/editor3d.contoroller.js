(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', Editor3dController);

    /** @ngInject */
    function Editor3dController(
        $rootScope, $scope, $filter, $compile ,$timeout, toastr,
        ModelLoadService, FileControlService, LightGenerateService,
        ModelControlService,
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

        // CONFIG...
        vm.editorSet = '3d';
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
        vm.ccUsage = true;
        // FOR APPLY DATA
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
                vm.toolEnabled[tools[i].name] = false;

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
                if(keys[i] === name) {
                    console.log('this tool is on',name);
                    vm.turnOnThisTool(name);
                    vm.toolEnabled[keys[i]] = true;
                }
                else {
                    console.log('this tool is off',keys[i]);
                    vm.turnOffThisTool(keys[i]);
                    vm.toolEnabled[keys[i]] = false;
                }
            }

            // REFRESH SLIDER VALUE
            $timeout(function () { $scope.$broadcast('rzSliderForceRender'); });

            console.log(vm.toolEnabled);
        };

        vm.turnOnThisTool = function(name) {
            if(name === 'lightTool') {
                for(var i = 0; i < vm.selectedLight.length; i++){
                    if(vm.selectedLight[i].enable) {
                        vm.scene.getObjectByName(vm.selectedLight[i].name).children[1].visible = true;
                        LightGenerateService.control.attach(vm.scene,vm.renderer);
                    }
                }
            }
            else if(name === 'geometryTool') {
                if(angular.element('.rotateTool').hasClass('selected')){
                    ModelControlService.attach(vm.scene,vm.renderer,'rotate');
                }
            }
            else if(name === 'materialTool') {

            }
            else if(name === 'mapTool') {

            }
            else return false;
        };
        vm.turnOffThisTool = function(name) {
            if(name === 'lightTool') {
                for(var i = 0; i < vm.selectedLight.length; i++){
                    if(vm.selectedLight[i].enable) {
                        vm.scene.getObjectByName(vm.selectedLight[i].name).children[1].visible = false;
                        LightGenerateService.control.detach(vm.scene);
                    }
                }
            }
            else if(name === 'geometryTool') {
                ModelControlService.detach(vm.scene);
            }
            else if(name === 'materialTool') {
                // NOTHING....
            }
            else if(name === 'mapTool') {
                // NOTHING....
            }
            else return false;
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
                        case 'obj' : object = ModelLoadService.combine(new THREE.OBJLoader().parse(contents)); break;
                        case 'stl' : object = ModelLoadService.setMesh(new THREE.STLLoader().parse(contents)); break;
                        case 'fbx' : object = ModelLoadService.combine(new THREE.FBXLoader().parse(contents)); break;
                        default :
                            toastr.error('Wrong extention');
                            return false;
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
            var keys = Object.keys(vm.toolEnabled);
            console.log(keys);
            for(var i = 0; i < keys.length; i++) {
                console.log(vm.toolEnabled);
                vm.toolEnabled[keys[i]] = false;
                vm.turnOffThisTool(keys[i]);
            }

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
            console.log(vm.model);

            // LIGHT REDEFINE...
            vm.selectedLight.map(function(v){
                if(v.object) v.position = v.object.children[0].position;
                delete v.object;
                return v;

                // POSITON이 Vector3로 들어감.
                // 추후 이것때문에 문제가 생길 시, Vector3안에 있는 데이터를 새로운 Object에 일일히 바인딩 해줄 것
            });

            vm.editorData = {
                attachedFiles: null, // DO
                attachedImg: null, // DO
                content: {
                    type: 1,
                    data: {
                        model: vm.model.toJSON(),
                        map: vm.selectedMapData,
                        lights: vm.selectedLight
                    }
                },
                setting: {
                    title: vm.title,
                    description: vm.description,
                    thumbnail: vm.thumbnail,
                    category: vm.selectedCategories,
                    tags: vm.tags,
                    cc: {
                        ccUsed: vm.ccUsage,
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
