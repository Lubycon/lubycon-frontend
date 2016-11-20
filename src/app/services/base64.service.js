(function () {
    'use strict';

    angular
        .module('services')
        .factory('Base64Service', [
            '$rootScope',
            Base64Service
        ]);

    function Base64Service(
        $rootScope
    ) {
        var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        var service = {
            encode: encode,
            decode: decode
        };

        return service;


        // PUBLIC
        function encode(input) {
            var output = '';

            var char1, char2, char3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            do {
                char1 = input.charCodeAt(i++);
                char2 = input.charCodeAt(i++);
                char3 = input.charCodeAt(i++);

                enc1 = char1 >> 2;
                enc2 = ((char1 & 3) << 4) | (char2 >> 4);
                enc3 = ((char2 & 15) << 2) | (char3 >> 6);
                enc4 = char3 & 63;


                if(isNaN(char2)) enc3 = enc4 = 64;
                else if(isNaN(char3)) enc4 = 64;

                output = output +
                    KEY_STR.charAt(enc1) +
                    KEY_STR.charAt(enc2) +
                    KEY_STR.charAt(enc3) +
                    KEY_STR.charAt(enc4);
                char1 = char2 = char3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            }
            while(i < input.length);

            return output;
        }

        function decode(input) {
            var output = '';

            var char1, char2, char3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            var base64regx = /[^A-Za-z0-9\+\/\=]/g;
            if(base64regx.exec(input)) {
                console.error(
                    "There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding."
                );
                return false;
            }

            input = input.replace(regx,'');

            do {
                enc1 = KEY_STR.indexOf(input.charAt(i++));
                enc2 = KEY_STR.indexOf(input.charAt(i++));
                enc3 = KEY_STR.indexOf(input.charAt(i++));
                enc4 = KEY_STR.indexOf(input.charAt(i++));

                char1 = (enc1 << 2) | (enc2 >> 4);
                char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                char3 = ((enc3 & 3) << 6) | enc4;

                output += String.fromCharCode(char1);

                if (enc3 !== 64) {
                    output +=  String.fromCharCode(char2);
                }
                if (enc4 !== 64) {
                    output += String.fromCharCode(char3);
                }

                char1 = char2 = char3 = '';
                enc1 = enc2 = enc3 = enc4 = '';

            }
            while (i < input.length);

            return output;


        }


        // PRIVATE
    }
})();

//         decode: function (input) {
//             var output = "";
//             var char1, char2, char3 = "";
//             var enc1, enc2, enc3, enc4 = "";
//             var i = 0;
//
//             // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
//             var base64test = /[^A-Za-z0-9\+\/\=]/g;
//             if (base64test.exec(input)) {
//                 window.alert("There were invalid base64 characters in the input text.\n" +
//                     "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
//                     "Expect errors in decoding.");
//             }
//             input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
//
            // do {
            //     enc1 = KEY_STR.indexOf(input.charAt(i++));
            //     enc2 = KEY_STR.indexOf(input.charAt(i++));
            //     enc3 = KEY_STR.indexOf(input.charAt(i++));
            //     enc4 = KEY_STR.indexOf(input.charAt(i++));
            //
            //     char1 = (enc1 << 2) | (enc2 >> 4);
            //     char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            //     char3 = ((enc3 & 3) << 6) | enc4;
            //
            //     output = output + String.fromCharCode(char1);
            //
            //     if (enc3 != 64) {
            //         output = output + String.fromCharCode(char2);
            //     }
            //     if (enc4 != 64) {
            //         output = output + String.fromCharCode(char3);
            //     }
            //
            //     char1 = char2 = char3 = "";
            //     enc1 = enc2 = enc3 = enc4 = "";
            //
            // } while (i < input.length);
            //
            // return output;
//         }
