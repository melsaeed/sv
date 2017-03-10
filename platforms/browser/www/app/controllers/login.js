/**
 * Copyright (C) Brightery 2017
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */


safa.controller('loginCtrl', function ($scope, $http, $location, $cookies) {
    $scope.credintials = {key: '', email: "", password: ""};
    $scope.credintials = {key: '9999', email: "h.jabban@safavisa.com", password: "2120828"};
    $scope.login = function () {
        
        $('button').html("<i class='fa fa-spinner fa-pulse fa-fw'></i>");

        $http({
            url: 'http://login.safavisa.com/offline/auth/'+$scope.credintials.email+'/'+md5($scope.credintials.password)+'/'+$scope.credintials.key,
            method: 'get',
        }).then(function(res){
            if(res.data.error) {
                alert(res.data.message);
                $('button').html("دخول");
            }
            else
            {
                window.localStorage.setItem('login', JSON.stringify({email: $scope.credintials.email, password: md5($scope.credintials.password)}));
                window.localStorage.setItem('user', JSON.stringify(res.data));
                window.localStorage.setItem('token', res.data.token);

                //console.log(JSON.parse(window.localStorage.getItem('user')));
                $location.path('dashboard');
            }
        });
        
        
        
        
//        $http({
//            url: api_url + 'auth/login',
//            withCredentials: true,
//            params: {email: $scope.credintials.email, password: calcMD5($scope.credintials.password)},
//            method: 'GET'
//        }).then(function (response) {
//            if (response.data.error) {
//                error.fire(response.data.message);
//                response.data.token
//            }
//            else{
//                $location.path('dashboard');
//            }
//        });
    };

    //dropdowns.countries('.countries');
    //$('.loginform').submit(function (e) {
    //    e.preventDefault();
    //    $.getJSON(api_url + 'auth/login', {
    //        email: $('input[name=email]').val(),
    //        password: calcMD5($('input[name=password]').val())
    //    }, function (response) {
    //        if (response.data.error)
    //            error.fire(response.data.message);
    //        else
    //            $location.path('/profile');
    //    });
    //});
    loading.stop();

});
