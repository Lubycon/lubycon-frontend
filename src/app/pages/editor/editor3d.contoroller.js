(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('Editor3dController', [
            '$rootScope', '$scope', '$filter', '$compile', '$timeout', 'toastr',
            'ModelLoadService', 'FileControlService', 'LightGenerateService',
            'ModelControlService', 'Restangular', '$state', 'EditorService',
            'get3dMaps','get2dMaps','getCategory','getCreativeCommons', 'getTools',
            Editor3dController
        ]);

    /** @ngInject */
    function Editor3dController(
        $rootScope, $scope, $filter, $compile ,$timeout, toastr,
        ModelLoadService, FileControlService, LightGenerateService,
        ModelControlService, Restangular, $state, EditorService,
        get3dMaps, get2dMaps, getCategory, getCreativeCommons, getTools
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

        // PUBLIC
        vm.init = (init)();
        function init(){
            EditorService.init(vm, {
                type: '3d',
                tools: getTools.data,
                creativeCommons : angular.copy(getCreativeCommons.data),
                categories : getCategory.data.threed
            });

            setWebGLConfig();
        }

        vm.toolboxToggle = function(name){
            EditorService.toolToggle(vm, name, {
                on: turnOnThisTool,
                off: turnOffThisTool
            });
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

                    setEditorTools();
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

        vm.crop = function() {
            vm.thumbnail = EditorService.cropImage(vm);
            // GO TO SETTING STEP!!!!
        };

        vm.detectTag = function(event) {
            EditorService.tag.add(vm, event.which);
        };

        vm.removeTag = function(index) {
            EditorService.tag.remove(vm, index);
        };

        vm.changeCC = function(element,index) {
            EditorService.setCreativeCommons(vm, index);
        };

        vm.postData = function() {
            // console.time('Data submit');

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
                    category: vm.selectedCategories.map(function(v){ return parseInt(v); }),
                    tags: vm.tags,
                    license: {
                        by: vm.creativeCommons[1].check,
                        nc: vm.creativeCommons[2].check,
                        nd: vm.creativeCommons[3].check,
                        sa: vm.creativeCommons[4].check
                    }
                }
            };
            if(!validator(vm.editorData)) return false;

            Restangular.all('contents/3d').customPOST(vm.editorData)
            .then(function(res) {
                if(res.status.code === '0000') {
                    angular.element('.modal-backdrop').remove();
                    $state.go('common.noFooter.contentMessage',{
                        success: true,
                        kind: 'contents',
                        id: vm.boardId
                    });
                }
            });

            console.timeEnd('Data submit');
        };







        // PRIVATE

        function setEditorTools() {
            $timeout(function(){
                bindSubTools(vm.config.tools);
            });
        }

        function setWebGLConfig() {
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
                        console.log(subTools[j].name,'is Loaded');
                        subTools[j].directive = $compile(subTools[j].directive)($scope);
                        subTools[j].directive.appendTo(target);
                    }
                }
            }
        }

        function action() {
            var keys = Object.keys(vm.toolEnabled);
            console.log(keys);
            for(var i = 0; i < keys.length; i++) {
                console.log(vm.toolEnabled);
                vm.toolEnabled[keys[i]] = false;
                turnOffThisTool(keys[i]);
            }

            var data = vm.renderer.domElement.toDataURL('image/jpeg',1);
            vm.capturedData = data;

            if(vm.selectedMapData.type === '2d') vm.renderer.setClearColor(0x222222,0);

            console.timeEnd('capture');
        }

        function turnOnThisTool(name) {
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
        }

        function turnOffThisTool(name) {
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
        }

        function validator(data) {
            var bool = true,
                msg = null,
                validations = [{
                    msg: 'CONTENT',
                    value: !!data.content
                },{
                    msg: 'TITLE',
                    value: !!data.setting.title
                },{
                    msg: 'CATEGORY',
                    value: data.setting.category.length > 0
                },{
                    msg: 'DESCRIPTION',
                    value: !!data.setting.description
                }];

            bool = validations.every(function(v) {
                msg = v.msg;
                return v.value;
            });

            if(!bool && msg) toastr.error($filter('translate')('EDITOR.VALIDATION.' + msg));

            return bool;
        }
    }
})();
