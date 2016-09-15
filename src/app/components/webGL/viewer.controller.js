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
                renderer: '='
            },
            link: link,
            controller: controller,
            controllerAs: 'webGLViewer'
        };

        return directive;

        function link($scope, $element, $attrs) {

        }
        function controller($rootScope, $scope, $element) {
            'use stict';

            $scope.isMobile = $rootScope.deviceInfo.isMobile;
            var windowWidth = $element.find('.webgl-viewer').width(),
                windowHeight = $element.find('.webgl-viewer').width() * 0.6;
            console.log('canvas size : ' + windowWidth + ' X ' + windowHeight);

            var gl = $element.find('.webgl-viewer')[0];
            var scene = $scope.scene;

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

            // TEST LIGHT...
            var testLight = new THREE.DirectionalLight(0xffffff,1);
                testLight.position.x = 2;
                testLight.position.y = 2;
                testLight.position.z = 2;
            scene.add(testLight);

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

            // TEST MODEL...
            // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            // var material = new THREE.MeshPhongMaterial( {color: 0x48cfad} );
            // var cube = new THREE.Mesh( geometry, material );
            // cube.name = 'mainObject';
            // scene.add( cube );
            // TEST MODEL...

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

            $rootScope.$on('$stateChangeStart', function() {
                cancelAnimationFrame(animationID);
            });
        }
    }
})();
