/**
 * Copyright (C) Brightery 2015
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */

companyProfile = {
    update: function () {
        $.ajax({
            url: api_url + 'key/info',
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            data: $('.profile_form').serialize(),
            success: function (res) {
                if (res.error)
                    error.fire(res.message);
                else {
                    $('.data').show();
                    $('.form-controller').hide();
                    $('.form-controller input').each(function (i, v) {
                        $(this).parent().prev().html($(this).val());
                    });
                    $('.form-controller select').each(function (i, v) {
                        $(this).parent().prev().html($(this).find(":selected").text());
                    });
                }
            }});
    }
};

safa.controller('companyCtrl', function ($scope, $http, $location, $rootScope) {
    $scope.isKey = false;
    $('.data-block-content').first().show();
    $('.data-block-title').on('click', function () {
        $('.data-block-content').hide();
        $(this).parent().find('.data-block-content').show();
    });
    $('.expand_collapse').on('click', function () {
        $('.data-block-content .data').hide();
        $('.data-block-content .form-controller').show();
    });
    $('.cancel').on('click', function () {
        $('.data-block-content .data').show();
        $('.data-block-content .form-controller').hide();
    });
    loading.start();
    $http.get(api_url + "key")
        .then(function (response) {
            if (response.error) {
                $location.path("/login");
            }
            $scope.company = response.data.company;
            dropdowns.countries($('select[name=country_id]'), response.data.company.country_id);
            //if($location.url() == '/company'){
                $rootScope.userImage = response.data.company.logo;
                //$scope.user.img = response.data.company.logo;
            //}
            loading.stop();
        }, function (response) {
            $location.path("/login");
        });
});

