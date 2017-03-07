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
        
        when('/splash', {
            templateUrl: 'templates/splash.html', 
            controller: 'splashCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/login', {
            templateUrl: 'templates/login.html', 
            controller: 'loginCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/logout', {
            templateUrl: 'templates/login.html',
            controller: 'logoutCtrl',
            resolve: {access: CheckLogin}}).
        
        when('/forget_pass', {
            templateUrl: 'templates/forget_pass.html', 
            controller: 'forgetPasswordCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/register', {
            templateUrl: 'templates/registration.html', 
            controller: 'registrationCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/dashboard', {
            templateUrl: 'templates/dashboard.html', 
            controller: 'dashboardCtrl',
            resolve: {access: CheckLogin}
        }).
        
        when('/activity_dashboard', {
            templateUrl: 'templates/activity_dashboard.html', 
            controller: 'activity_dashboardCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/main_dashboard', {
            templateUrl: 'templates/main_dashboard.html', 
            controller: 'main_dashboardCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/main', {
            templateUrl: 'templates/main.html', 
            controller: 'mainCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/users', {
            templateUrl: 'templates/users.html', 
            controller: 'usersCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/promos', {
            templateUrl: 'templates/promos.html', 
            controller: 'promosCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/promoDetails', {
            templateUrl: 'templates/promoDetails.html', 
            controller: 'promoDetailsCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/system', {
            templateUrl: 'templates/system.html', 
            controller: 'systemCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/training', {
            templateUrl: 'templates/training.html', 
            controller: 'trainingCtrl',
            resolve: {access: CheckLogin}
        }).
        when('/log', {
            templateUrl: 'templates/log.html', 
            controller: 'logCtrl',
            resolve: {access: CheckLogin}
        }).

            
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
//            if( ! config.params)
//                config.params = {};
//            config.params.token = window.localStorage.getItem("token");
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
        url: api_url + 'auth/login',
        method: 'get',
        params: JSON.parse(window.localStorage.getItem('login'))
    }).then(function (res) {
        if (res.data.error) {
            $location.path('/login');
//            message("Error: Auth Error");
        }
        $rootScope.userData = res.data.data;
        return true;
    });
};



var popup = {
    message: function (title, message, remove_button) {
        $('body').append('<div id="myModal" class="modal fade">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            + '<h4 class="modal-title">' + title + '</h4>'
            + '</div>'
            + '<div class="modal-body Template">'
            + ' <p>' + message + '</p>'
            + '</div>' +
            (typeof remove_button == 'undefined') ? ' <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Ø¥ØºÙ„Ø§Ù‚</button>  </div>' : ''
            + ' </div>'
            + '  </div>'
            + ' </div>'
        );
        $("#myModal").modal('show');
        $('#myModal').on('hidden.bs.modal', function () {
            $(this).remove();
        });
        return false;
    }
};