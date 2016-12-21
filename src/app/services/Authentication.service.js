(function () {
    'use strict';

    angular
        .module('services')
        .factory('Authentication', [
            'CookieService', '$rootScope', '$rootScope', 'Restangular',
            '$window', '$location', 'toastr', '$state', '$filter',
            'HistoryService', 'AppSettingService',
            Authentication
        ]);

    function Authentication(
        CookieService, $cookies, $rootScope, Restangular,
        $window, $location, toastr, $state, $filter,
        HistoryService, AppSettingService
    ) {
        var defaultHeaders = Restangular.defaultHeaders;
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

            // SET DESTINATION
            if(memberState) {
                isExistBackState = HistoryService.get().from.url !== '^';

                if(memberState === 'inactive') {
                    toastr.warning($filter('translate')('TOAST.ACCOUNT.NOT_AUTHENTICATE'),{
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

            // SET TOKEN IN HTTP HEADER...
            defaultHeaders = Restangular.defaultHeaders;
            defaultHeaders["X-lubycon-token"] = oauthdata;
            Restangular.setDefaultHeaders(defaultHeaders);

            // GET MEMBER DATA...
            Restangular.all('members/simple').customGET().then(
                function (res) {
                    if(res.status.code === '0000') {
                        $rootScope.member = res.result;
                        console.log($rootScope.member);
                        if($rootScope.member.country) AppSettingService.set('country', $rootScope.member.country.alpha2Code);
                        CookieService.put('member', $rootScope.member);

                        if(isExistBackState) {
                            console.log(HistoryService.get());
                            var stateName = HistoryService.get().from.name,
                                stateParams = HistoryService.get().from.params;

                            if(stateParams) $state.go(stateName, stateParams);
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

        function updateCredentials(memberState, state) {
            $rootScope.memberState.condition = memberState;
            CookieService.putEncrypt('memberState', $rootScope.memberState);

            Restangular.all('members/simple').customGET().then(
                function (res) {
                    if(res.status.code === '0000') {
                        $rootScope.member = res.result;
                        CookieService.put('member', $rootScope.member);
                        AppSettingService.set('country',$rootScope.member.country.alpha2Code);

                        if(state) $state.go(state.name, state.params);
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

                    AppSettingService.set('country',$rootScope.setting.country_code);
                    if(reload === 'reload') {
                        $location.path(target);
                        $window.location.reload();
                    }
                });
            }
        }
    }
})();
