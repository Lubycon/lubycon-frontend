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

        var windowWidth = 640, windowHeight = 480;


        gl = angular.element('.test-webgl')[0];
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
        camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
        cameraLight = new THREE.SpotLight(0xffffff, 0.01);

        // SET camera
        camera.position.set(1, 1, 10);
        console.log(camera);
        cameraLight.castShadow = true;
        cameraLight.receiveShadow = true;
        cameraLight.target.position.set(0, 0, 0);
        cameraLight.position.copy(camera.position);

        // SET TEST OBJECT
        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshPhongMaterial();
            material.color = new THREE.Color(25,251,59);
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
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x444444, 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

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
    }
})();
