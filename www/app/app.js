/**
 * Copyright (C) Brightery 2017
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */
var safa = angular.module('safa', [
    'ngRoute',
    'ngCookies',
]);

safa.config(function ($routeProvider, $httpProvider) {
    
    $routeProvider.
        
        when('/splash', {templateUrl: 'templates/splash.html', controller: 'splashCtrl'}).
        when('/login', {templateUrl: 'templates/login.html', controller: 'loginCtrl'}).
        when('/logout', {templateUrl: 'templates/login.html',controller: 'logoutCtrl'}).
        
        when('/forget_pass', {templateUrl: 'templates/forget_pass.html', controller: 'forgetPasswordCtrl'}).
        when('/register', {templateUrl: 'templates/registration.html', controller: 'registrationCtrl'}).
        when('/dashboard', {templateUrl: 'templates/dashboard.html', controller: 'dashboardCtrl'}).
        
        when('/activity_dashboard', {templateUrl: 'templates/activity_dashboard.html', controller: 'activity_dashboardCtrl'}).
        when('/main_dashboard', {templateUrl: 'templates/main_dashboard.html', controller: 'main_dashboardCtrl'}).
        when('/main', {templateUrl: 'templates/main.html', controller: 'mainCtrl'}).
        when('/users', {templateUrl: 'templates/users.html', controller: 'usersCtrl'}).
        when('/promos', {templateUrl: 'templates/promos.html', controller: 'promosCtrl'}).
        when('/promoDetails', {templateUrl: 'templates/promoDetails.html', controller: 'promoDetailsCtrl'}).
        when('/system', {templateUrl: 'templates/system.html', controller: 'systemCtrl'}).
        when('/training', {templateUrl: 'templates/training.html', controller: 'trainingCtrl'}).
        when('/log', {templateUrl: 'templates/log.html', controller: 'logCtrl'}).

            
        when('/upload_images', {
            templateUrl: 'templates/upload_images.html',
            controller: 'upload_imagesCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/uasp', {
            templateUrl: 'templates/uasp.html',
            controller: 'uaspCtrl',
            resolve: {access: CheckLogin}
        }).
                
        otherwise({redirectTo: '/splash'});

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

safa.factory('httpRequestInterceptor', function ($cookies) {
    return {
        request: function (config) {
            if( ! config.params)
                config.params = {};
            config.params.token = window.localStorage.getItem("token");
            config.headers['X-Auth-Token'] = window.localStorage.getItem("token");
            return config;
        }
    };
});

safa.run(['$http', function ($http, $cookies) {
    $http.defaults.withCredentials = true;
//    if(typeof token != 'undefined' && token != '')
//    if ($cookies.get('token'))
//        $http.defaults.headers.common['X-Auth-Token'] = $cookies.get('token');
//    else
//        $http.defaults.headers.common['X-Auth-Token'] = window._token;

    //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);


var CheckLogin = function ($rootScope, $http, $location) {
    return $http({
        url: API + 'auth/login',
        method: 'get',
        params: JSON.parse(window.localStorage.getItem('login'))
    }).then(function (res) {
        if (res.data.error) {
            $location.path('/login');
            message("Error: Auth Error");
        }
        $rootScope.userData = res.data.data;
        return true;
    });
};