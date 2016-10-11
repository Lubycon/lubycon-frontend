(function() {
    'use strict';

    angular
        .module('app')
        .directive('webglViewer', webglViewer);

    /* @ngInject */
    function webglViewer() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/webGL/viewer.tmpl.html',
            scope: {
                model: '=',
                scene: '=',
                renderer: '=',
                map: '=',
                lights: '='
            },
            link: link,
            controller: controller,
            controllerAs: 'webGLViewer'
        };

        return directive;

        function link($scope, $element, $attrs) {
            console.log($scope.model);
            $scope.$watch('map',function(newValue,oldValue) {
                console.log('MAP CHANGED : ',oldValue,'=>',newValue);
                if(newValue.type === '3d') $scope.initSkyBox();
                else if(newValue.type === '2d') $scope.init2DMap();
            },true);

            $scope.$watch('model',function(newValue,oldValue) {
                var oldModel = $scope.scene.getObjectByName('mainObject');

                if(oldModel) $scope.scene.remove(oldModel);

                if(newValue && (newValue.constructor.name === 'Mesh' || newValue.constructor.name === 'Group')) {
                    $scope.scene.add(newValue);
                }
                else if(newValue && newValue.constructor.name === 'Object') { // JSON일 경우
                    var loader = new THREE.ObjectLoader().parse(newValue);
                    $scope.scene.add(loader);
                }
            });
        }
        function controller($rootScope, $scope, $element) {
            'use stict';
            console.log($scope.map);
            $scope.isMobile = $rootScope.deviceInfo.isMobile;
            var windowWidth = $element.find('.webgl-viewer').width(),
                windowHeight = $element.find('.webgl-viewer').width() * 0.6;
            console.log('canvas size : ' + windowWidth + ' X ' + windowHeight);

            var gl = $element.find('.webgl-viewer')[0];
            var scene = $scope.scene;
            $scope.initSkyBox = initSkyBox;
            $scope.init2DMap = init2DMap;

            // CAMERA SETTING....
            var camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
                camera.position.x = -2;
                camera.position.y = 1;
                camera.position.z = 3;
                camera.name = 'mainCamera';
            var cameraLight = new THREE.SpotLight(0xffffff,0.1);
                cameraLight.castShadow = true;
                cameraLight.receiveShadow = true;
                cameraLight.target.position.set(0, 1, -1);
                cameraLight.position.copy(camera.position);

            scene.add(camera, cameraLight);

            // MAP SETTING...FOR 3D
            initSkyBox();
            // MAP SETTING...FOR 2D
            // NOTHING

            // RENDERER SETTING....
            var renderer = $scope.renderer;
                renderer.setSize(windowWidth, windowHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setClearColor(0x222222, 1);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                renderer.gammaInput = true;
                renderer.gammaOutput = true;

        	gl.addEventListener("webglcontextlost", function(event){
        		event.preventDefault();
        		alert("context is lost");
        		cancelAnimationFrame(animationID);
        	},false);
        	// console.log(renderer);
        	gl.appendChild(renderer.domElement);

            // CONTROL SETTING....
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
        		controls.enableDamping = true;
                controls.dampingFactor = 0.1;
                controls.rotateSpeed = 0.5;
                controls.zoomSpeed = 0.5;
                controls.maxDistance = 100;
                // controls.autoRotate = true;
                // controls.autoRotateSpeed = 0.3;

            // EVENT BINDING....
            window.addEventListener("resize", windowResizeGL, false);
            angular.element(document).on("keydown",initCamera);
            animateGL();

            function initCamera(event){
                if(event.which == 32){
                    camera.position.x = -2;
                    camera.position.y = 0.7;
                    camera.position.z = 2.5;
                    return false;
                }
            }

            function animateGL(){
            	controls.update();
            	requestAnimationFrame(animateGL);
        	    renderGL();
            }

            function renderGL(){
            	renderer.render(scene, camera);
            	cameraLight.position.copy(camera.position);
            }

            function windowResizeGL(){
            	var windowWidth = $element.find('.webgl-viewer').width(),
                windowHeight = $element.find('.webgl-viewer').width() * 0.75;

            	camera.aspect = windowWidth / windowHeight;
            	camera.updateProjectionMatrix();
            	renderer.setSize(windowWidth, windowHeight);
            }

            function initSkyBox() {
                var oldLight = $scope.scene.getObjectByName('2dLight');
                if(oldLight) $scope.scene.remove(oldLight);

                // SKYBOX SETTING....FOR 3D
                if($scope.scene.getObjectByName('skybox')) $scope.scene.remove($scope.scene.getObjectByName('skybox'));

                var skyGeometry = new THREE.SphereGeometry(500, 60, 40),
                    skyMaterial = new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load($scope.map.image)
                    });
                    skyMaterial.side = THREE.BackSide;
                    skyMaterial.dispose();
                var skyMesh = new THREE.Mesh(skyGeometry,skyMaterial);
                var skybox = new THREE.Group();
                    skybox.add(skyMesh);
                    skybox.index = $scope.map.id;
                    skybox.name = "skybox";

                for(var i = 0, l = $scope.map.light.length; i < l; i++){
                    var newLight = lightGenerate($scope.map.light[i],i);
                    skybox.add(newLight);
                }
                scene.add(skybox);
            }

            function init2DMap() {
                $element.parent().css('background-color',$scope.map.color);
                if($scope.map.image === '#') $element.parent().css('background-image','none');
                else $element.parent().css('background-image',"url(" + $scope.map.image + ")");
                clearRendererMap();
            }

            function clearRendererMap() {
                var skybox = $scope.scene.getObjectByName('skybox');
                var oldLight = $scope.scene.getObjectByName('2dLight');
                console.log(skybox);

                // REMOVE SKYBOX
                if(skybox) {
                    $scope.scene.remove(skybox);
                    $scope.renderer.setClearColor(0x222222,0);
                }

                if(!oldLight) {
                    var light = new THREE.DirectionalLight(0xffffff,1);
                        light.name = '2dLight';
                        light.position.x = 100;
                        light.position.y = 100;
                        light.position.z = 100;
                    $scope.scene.add(light);
                }
            }

            function lightGenerate(light,index) {
                var type = light.type,
                newLight = null;
                switch(type){
                    case "DirectionalLight" :
                        newLight = new THREE.DirectionalLight(light.color*1,light.intensity);

                        newLight.target.position.set(
                            light.target.x,
                            light.target.y,
                            light.target.z
                        );
                    break;
                    case "SpotLight" :
                        newLight = new THREE.SpotLight(light.color*1,light.intensity);
                        newLight.angel = light.angle;
                        newLight.penumbra = light.penumbra;
                        newLight.target.position.set(
                            light.target.x,
                            light.target.y,
                            light.target.z
                        );
                    break;
                    case "HemisphereLight" :
                        newLight = new THREE.HemisphereLight(light.skyColor*1,light.groundColor*1,light.intensity);
                    break;
                    case "PointLight" :
                        newLight = new THREE.PointLight(light.color*1,light.intensity,light.radius);
                    break;
                    default : return false;
                }

                newLight.position.set(
                    light.position.x,
                    light.position.y,
                    light.position.z
                );
                newLight.name = "presetLight"+index;

                return newLight;
            }

            $rootScope.$on('$stateChangeStart', function() {
                cancelAnimationFrame(animationID);
            });
        }
    }
})();
