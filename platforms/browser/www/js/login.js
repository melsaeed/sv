/**
 * Copyright (C) Brightery 2015
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */

console.log(123);

safa.controller('loginCtrl', function ($scope, $http, $location) {

    $scope.credintials = {email: "h.jabban@safavisa.com", password: "2120828"};
    console.log($scope.credintials);
    $scope.login = function () {
        $http({
            url: api_url + 'auth/login',
            withCredentials: true,
            params: {email: $scope.credintials.email, password: calcMD5($scope.credintials.password)},
            method: 'GET',
            headers: {
                'Content-Type': undefined
            },
        }).then(function (response) {
            if (response.data.error)
                error.fire(response.data.message);
            else
                $location.path('/profile');
        });
    };

    dropdowns.countries('.countries');
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
    $('.registerform').submit(function (e) {
        e.preventDefault();
        $.post(api_url + 'user', $(this).serialize(), function (response) {
            if (response.error) {
                error.fire(response.message);
            }
            else {
                error.fire("Confirmation email has been sent to your email shortly");
            }
        });
    });

});
