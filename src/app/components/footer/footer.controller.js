(function() {
    'use strict';

    angular
        .module('components')
        .controller('FooterController', footerController);

    /* @ngInject */
    function footerController(
        $rootScope, $scope, $location, $state, $http,
        Restangular, $timeout, LanguageService
    ) {
        var vm = this;

        $http.get('/data/languages.json').then(function(res) {
            vm.languages = res.data;
            vm.init();

        });

        vm.init = function() {

        };

        vm.changeLanguage = function(lang) {
            LanguageService.set(lang);
        };
    }
})();
