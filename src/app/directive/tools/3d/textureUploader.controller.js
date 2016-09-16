(function() {
    'use strict';

    angular
        .module('app.pages.editor')
        .controller('textureUploaderController', textureUploaderController);

    /** @ngInject */
    function textureUploaderController($scope, $uibModalInstance, textures, type) {
        if(textures.length !== 0) $scope.textures = textures;
        else $scope.textures = [];

        console.log(textures,$scope.textures,type);

        $scope.changedFile = function(files,file,newFiles,invalidFiles) {
            console.log(files,file,newFiles,invalidFiles);
            console.log($scope.textures.length === 0);

            for(var i = 0; i < newFiles.length; i++){
                newFiles[i].selected = false;
            }

            if($scope.textures.length === 0) {
                $scope.textures = files;
                $scope.textures[0].selected = true;
                $scope.textures[0].usedType = type;

                $scope.selectedTexture = $scope.textures[0];
            }
            else $scope.textures = $.merge($scope.textures, newFiles);

            console.log($scope.textures);
        };

        $scope.selectTexture = function(index) {
            for(var i = 0; i < $scope.textures.length; i++){
                console.log($scope.textures);
                $scope.textures[i].selected = false;
                delete $scope.textures[i].usedType;
            }
            $scope.textures[index].selected = true;
            $scope.textures[index].usedType = type;
            $scope.selectedTexture = $scope.textures[index];
            console.log('selected texture : ',$scope.textures[index]);
        };

        $scope.ok = function() {
            $uibModalInstance.close({
                selectedTexture: $scope.selectedTexture,
                textures: $scope.textures
            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
