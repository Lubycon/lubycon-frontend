(function() {
    'use strict';

    angular
        .module('app.pages.test')
        .controller('TestController', [
            '$rootScope', '$scope', '$timeout',
            TestController
        ]);

    /** @ngInject */
    function TestController(
        $rootScope, $scope, $timeout
    ) {
        console.log('TestController is loaded');


        var vm = this;


        var gl,
            scene,
            camera,
            cameraLight,
            animationRequest,
            renderer,
            controls,
            object;
        var windowWidth, windowHeight;

        // EXCEPTION TESTING....
        var canvas;
        function webglAvailable() {
            canvas = document.createElement('canvas');
    		// try {
    		// 	canvas = document.createElement( 'canvas' );
    		// 	return !!( window.WebGLRenderingContext && (
    		// 		canvas.getContext( 'webgl' ) ||
    		// 		canvas.getContext( 'experimental-webgl' ) )
    		// 	);
    		// } catch ( e ) {
            //     console.log('webgl avliable excpetion => ',e);
    		// 	return false;
    		// }
    	}

        console.log('==================WEBGL TESTING1==================');
        console.log('webGL AVAILABLE => ',webglAvailable());
        console.log('canvas.getContext("experimental-webgl") =>',canvas.getContext( 'experimental-webgl' ));
        console.log('canvas.getContext("webgl") =>',canvas.getContext( 'webgl' ));
        console.log('canvas.getContext("webgl2") =>',canvas.getContext( 'webgl2' ));
        console.log('canvas.getContext("2d") =>',canvas.getContext( '2d' ));
        console.log('window.WebGLRenderingContext => ',window.WebGLRenderingContext);
        console.log('=================================================');
        // EXCEPTION TESTING...


        gl = angular.element('.test-webgl');
        windowWidth = gl.width();
        windowHeight = windowWidth * 0.6;
        gl = gl[0];
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
        camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
        cameraLight = new THREE.SpotLight(0xffffff, 0.01);

        // SET camera
        camera.position.set(1, 1, 10);
        cameraLight.castShadow = true;
        cameraLight.receiveShadow = true;
        cameraLight.target.position.set(0, 0, 0);
        cameraLight.position.copy(camera.position);

        // TEXTURE TEST
        var tLoader = new THREE.TextureLoader();
        tLoader.load('assets/images/country/200.png', function(res) {
            // SET TEST OBJECT
            var geometry = new THREE.BoxGeometry(1,1,1);
            var material = new THREE.MeshPhongMaterial();
                material.map = res;
                material.color = new THREE.Color(255,255,255);
                material.side = THREE.DoubleSide;
                material.transparent = true;
                material.needsUpdate = true;
            object = new THREE.Mesh(geometry, material);
                object.position.set(0,0,0);

            // SET CONTROL
            controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.1;
                controls.rotateSpeed = 0.5;
                controls.zoomSpeed = 0.5;
                controls.maxDistance = 100;
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.6;

            // ADD SCENE
            scene.add(camera, cameraLight, object);

            // SET renderer
            renderer.setSize(windowWidth, windowHeight);
            if(webglAvailable()) renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x222222, 1);
            // renderer.shadowMap.enabled = true;
            // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            // renderer.gammaInput = true;
            // renderer.gammaOutput = true;

            gl.appendChild(renderer.domElement);
            animate();

            function animate() {
                controls.update();
                animationRequest = requestAnimationFrame(animate);
                render();
            }
            function render() {
                renderer.render(scene, camera);
                cameraLight.position.copy(camera.position);
            }
        });


    }
})();
