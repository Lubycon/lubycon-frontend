(function () {
    'use strict';

    angular
        .module('app')
        .factory('TextureService', [
            '$rootScope',
            TextureService
        ]);

    function TextureService($rootScope) {
        var service = {
            get: getTexture
        };

        return service;

        function getTexture(file,callback) {
            var isTGA = /(^image)\/(targa)/i.test(file.type) && /.*\.(tga)/i.test(file.name);

            var reader = new FileReader(),
                textureLoader,
                texture;

            if(isTGA) textureLoader = new THREE.TGALoader();
            else textureLoader = new THREE.TextureLoader();

            reader.readAsDataURL(file);
            reader.onload = function(event){
                textureLoader.load(event.target.result, function(result) {
                    callback(result);
                });
            };
        }
    }
})();
