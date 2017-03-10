
safa.controller('forgetPasswordCtrl', function ($scope, $http, $rootScope, $location) {
    $scope.forget_password = function () {
        if ($scope.email.length == 0) {
            alert("بريد إلكتروني غير صحيح");
        }
        else {
            $http({
                url: api_url + 'user/forget_password',
                method: 'post',
                data: {email: $scope.email}
            }).then(function (response) {
                if (response.data.error)
                    alert("بريد إلكتروني غير مطابق");
                else
                    alert("تم ارسال بريد إلكتروني لتقوم بتغيير كلمة المرور، شكرا لك");
            });
        }
    }
});

safa.controller('activity_dashboardCtrl', function ($scope, $http, $rootScope, $location) {

});

safa.controller('team_lastactivityCtrl', function ($scope, $http, $rootScope, $location) {

});
