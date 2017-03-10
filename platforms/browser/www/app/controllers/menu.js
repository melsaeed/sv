safa.controller('menuCtrl', function ($scope, $rootScope, $http, $location) {
    
    
    $http.get(api_url + "profile?token="+window.localStorage.getItem('token'))
            .then(function (response) {
                if (response.error) {
                    $location.path("/login");
                }
//                loading.stop();
               
                $rootScope.user = response.data.user;
//                $scope.user = JSON.parse(window.localStorage.getItem('login'));


//                $rootScope.MyCompany = $rootScope.user.group.filter(function (x) {
//                    return x.company_group_id == $rootScope.user.default_company_group_id;
//                })[0];

//                if ($location.url() == '/company') {
//                    $scope.user.img = $rootScope.userImage;
//                }
                
//                $rootScope.userImage = response.data.user.img;
//                $('select[name=gender]').val(response.data.user.info.gender);
                $rootScope.permission = function (screen_id) {
                    return ($rootScope.user.group.filter(function (x) {
                        return x.company_group_id == $rootScope.user.default_company_group_id;
                    })[0].screen.filter(function (sc) {
                        return screen_id == sc.screen_id;
                    })).length;
                };
                $rootScope.companyTypeId = function (id) {
                    return ($rootScope.user.group.filter(function (x) {
                        return x.company_group_id == $rootScope.user.default_company_group_id;
                    })[0].company.company_type_id) == id;
                };
                
//            }, function (response) {
//                $location.path("/login");
            });
});