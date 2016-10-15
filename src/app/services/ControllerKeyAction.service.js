(function () {
    'use strict';

    angular
        .module('app')
        .factory('ControllerKeyActionService', [
            '$rootScope', '$document',
            ControllerKeyActionService
        ]);

    function ControllerKeyActionService($rootScope,$document) {
        var service = {
            start: keyActionBind,
            stop: keyActionUnbind
        };

        return service;

        function keyActionBind(controller) {
            $document.on('keydown',{
                controller: controller
            },keyAction);
        }

        function keyActionUnbind() {
            $document.off('keydown',keyAction);
        }

        function keyAction(event) {
            // IT'S SAME TO 3dMax, Maya
            // 69 = e, 82 = r, 87 = w
            if(event.which === 69) event.data.controller.setMode('rotate');
            else if(event.which === 82) event.data.controller.setMode('scale');
            else if(event.which === 87) event.data.controller.setMode('translate');
            else return false;
        }
    }
})();
