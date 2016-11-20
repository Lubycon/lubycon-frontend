(function () {
    'use strict';

    angular
        .module('app')
        .factory('EditorService', ['$rootScope', EditorService]);

    function EditorService($rootScope) {

        var service = {
            init: init,
            toolToggle: toolToggle,
            tag: {
                add: addTag,
                remove: removeTag
            },
            cropImage: cropImage,
            setCreativeCommons: setCreativeCommons
        };

        return service;

        // PUBLIC
        function init(controller, params) {
            console.log(controller,params);
            controller.editorSet = params.type;

            controller.config = params.tools;
            controller.toolEnabled = {};

            controller.cropping = false;
            controller.tags = [];
            controller.selectedCategories = [];
            controller.currentTag = null; // THIS VALUE IS USED FOR INPUT ELEMENT

            controller.creativeCommons = creativeCommonsConfig(params.creativeCommons);
            controller.categories = params.categories;

            controller.ccUsage = true;
            controller.downloadable = false;

            controller.editorData = {};
        }

        function toolToggle(controller, name, callbacks) {
            if(controller.toolEnabled[name]) controller.toolEnabled[name] = false;
            else {
                var keys = Object.keys(controller.toolEnabled);
                console.log('KEYS IN EDITOR SERVICE.TOOL==========',keys,'=========');
                keys.map(function(v, i, array) {
                    if(array[i] === name) {
                        callbacks.on(name);
                        controller.toolEnabled[array[i]] = true;
                    }
                    else {
                        callbacks.off(array[i]);
                        controller.toolEnabled[array[i]] = false;
                    }

                    return v;
                });
            }
        }

        function addTag(controller, keyCode) {
            if(keyCode === 13 || keyCode === 32) {
                controller.tags.push(controller.currentTag);
                controller.currentTag = null;
            }
        }

        function removeTag(controller, index) {
            controller.tags.splice(index,1);
        }

        function cropImage(controller) {
            controller.cropping = false;

            var canvas = angular.element('.cropper').cropper('getCroppedCanvas', { width: 640, height: 640 }),
                base64 = canvas.toDataURL('image/jpeg');
            return base64;
        }

        function setCreativeCommons(controller, index) {
            console.log(controller.creativeCommons[index].check);
            if(controller.creativeCommons[index].check) {
                if(index === 3) controller.creativeCommons[4].disabled = true;
                else if(index === 4) controller.creativeCommons[3].disabled = true;
                else return false;
            }
            else {
                if(index === 3) controller.creativeCommons[4].disabled = false;
                else if(index === 4)  controller.creativeCommons[3].disabled = false;
                else return false;
            }
        }





        //PRIVATE
        function creativeCommonsConfig(data) {
            data[0].disabled = true;
            data[4].disabled = true;
            data.map(function(v) {
                v.descript = 'LICENSE.DESCRIPTION.' + v.id.toUpperCase();
                return v;
            });

            return data;
        }
    }
})();
