(function() {
  'use strict';

  angular
    .module('app', [
        'common', // COMMON MODULE
        'components', // COMPONENTS MODULE
        'app.pages', // PAGES MODULE
        'error', // ERROR PAGE MODULE
        'messages', // MESSAGE PAGE MODULE
        'services', // SERVICE MODULE
        'pascalprecht.translate', // TRANSLATE FOR LANGUAGE PACK MODULE
        'ngAnimate', // animate.css MODULE
        'ngCookies', // COOKIE STORE MODULE
        'ngTouch', // TOUCH MODULE FOR MOBILE
        'ngSanitize', // STRING TO HTML CONVERT MODULE
        'ngMessages', // INFO OR ERROR MESSAGE MODULE
        'ngAria', // FORM CONTROL MODULE
        'ui.select2', // SELECT BOX MODULE
        'restangular', // REST API MODULE
        'ui.router', // ROUTING MODULE
        'ui.bootstrap', // BOOTSTRAP
        'ngFileUpload', // FILE UPLOAD MODULE
        'rzModule', // SLIDER COMPONENT MODULE
        'angularSpectrumColorpicker', // COLOR PICKER MODULE
        'switcher', // CHECKBOX SWITCH MODE MODULE
        'toastr', // TOAST MESSAGE MODULE
        'summernote', // TEXT EDITOR MODULE
        'infinite-scroll', // INFINITE SCROLL
        'monospaced.elastic' // TEXTAREA AUTOMATICALLY SIZE
    ])
    .constant('APP_LANGUAGES', [{
        name: 'LANGUAGES.ENGLISH',
        key: 'en'
    },{
        name: 'LANGUAGES.KOREAN',
        key: 'ko'
    }])
    .constant('CONSOLE_LOG', true) // REAL SERVER -> false
    .constant('API_CONFIG', {
        'host': 'http://api.lubycon.com/v1', // TEST SERVER
        'appkey': 'lubycon-back'
    })
    .constant('SNS_KEYS', {
        // facebook: isLocalHost ? localhost_key : aws_key
        'facebook': location.host.search('localhost') > -1 ? '235565303522189' : '235563266855726',
        'google': '146842299447-53e5q3m36g8tmgtfr78eel9nib3517pi.apps.googleusercontent.com'
    })
    .constant('SNS_NAME', {
    // THIS IS GLOBAL SNSKEY FOR APP
        '0100':'email',
        '0101':'facebook',
        '0102':'google'
    })
    .constant(); // ADD NEW CONSTANT

})();
