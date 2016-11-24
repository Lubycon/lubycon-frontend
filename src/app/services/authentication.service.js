(function () {
    'use strict';

    angular
        .module('services')
        .factory('Authentication', [
            'CookieService', '$cookies', '$rootScope', 'Restangular',
            '$window', '$location', 'toastr', '$state',
            Authentication
        ]);

    function Authentication(
        CookieService, $cookies, $rootScope, Restangular,
        $window, $location, toastr, $state
    ) {

        var defaultHeaders = Restangular.defaultHeaders;
        Restangular.setDefaultHeaders(defaultHeaders);
        console.log(defaultHeaders);

        var service = {
            signIn: Restangular.service('members/signin'),
            signUp: Restangular.service('members/signup'),
            setCredentials: setCredentials,
            updateCredentials: updateCredentials,
            clearCredentials: clearCredentials
        };

        return service;

        function setCredentials(token, memberState, reload) {
            if(!token) {
                toastr.error('토큰이 없습니다.');
                return false;
            }
            // INIT TOKEN...
            var oauthdata = token;
            var isExistBackState;

            // SET DESCTINATION
            if(memberState) {
                isExistBackState = $rootScope.clientLocation.from.url !== '^';

                if(memberState === 'inactive') {
                    toastr.warning('아직 인증이 끝나지 않았습니다. 이 메세지를 클릭하시면 인증페이지로 이동합니다.',{
                        closeDuration: 10000,
                        onTap: function() {
                            $location.path('/certs/code/signup');
                        }
                    });
                }
            }
            else return false;

            $rootScope.memberState = {
                sign: true,
                condition: memberState
            };

            // SET COOKIE DATA...
            CookieService.putEncrypt('oauth', oauthdata);
            CookieService.putEncrypt('memberState', $rootScope.memberState);

            // SET HTTP HEADER...
            defaultHeaders = Restangular.defaultHeaders;
            defaultHeaders["X-lubycon-Token"] = oauthdata;
            Restangular.setDefaultHeaders(defaultHeaders);

            // GET MEMBER DATA...
            Restangular.all('members/simple').customGET().then(
                function (res) {
                    if(res.status.code === '0000') {
                        $rootScope.member = res.result;
                        CookieService.put('member', $rootScope.member);

                        if(isExistBackState) {
                            console.log($rootScope.clientLocation);
                            var stateName = $rootScope.clientLocation.from.name,
                                stateParams = $rootScope.clientLocation.from.params;

                            if(stateParams) $state.go(stateName,stateParams);
                            else $state.go(stateName);
                        }
                        else $state.go('common.figure.main');

                    }
                    else {
                        console.log(res.status);
                        service.clearCredentials();
                    }
                },
                function (err) {
                    console.log(err);
                    service.clearCredentials('reload');
                }
            );

            // REFRESH COOKIE...
            CookieService.putEncrypt('memberState', $rootScope.memberState);

            if(reload === 'reload') $window.location.reload();
        }

        function updateCredentials(memberState,destination) {
            $rootScope.memberState.condition = memberState;
            CookieService.putEncrypt('memberState', $rootScope.memberState);

            Restangular.all('members/simple').customGET().then(
                function (res) {
                    if(res.status.code === '0000') {
                        $rootScope.member = res.result;
                        CookieService.put('member', $rootScope.member);

                        if(destination) $location.path(destination);
                        else return false;
                    }
                    else {
                        console.log(res.status);
                        service.clearCredentials();
                    }
                }
            );
        }

        function clearCredentials(reload, target) {
            console.log(Restangular.defaultHeaders,$rootScope);
            if(!target) target = '/main';
            if($rootScope.member && ($rootScope.memberState.condition === 'active' || $rootScope.memberState.condition === 'inactive')) {
                Restangular.all('members/signout').customPUT(
                    { memberId: $rootScope.member.id }
                ).then(function () {
                    delete $rootScope.member;

                    // DESTORY TOKEN AND SIGN DATA
                    CookieService.remove('oauth');

                    $rootScope.memberState.sign = false;
                    delete $rootScope.memberState.condition;

                    CookieService.putEncrypt('memberState',$rootScope.memberState);
                    if(reload === 'reload') {
                        $location.path(target);
                        $window.location.reload();
                    }
                });
            }
        }
    }
})();
