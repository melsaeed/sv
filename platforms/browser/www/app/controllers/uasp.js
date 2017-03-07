safa.controller("uaspCtrl", function ($scope, $location, $http) {

    $scope.MainTitle = 'إرسال إلي المخاع';
    $scope.user = JSON.parse(window.localStorage.getItem('user'));
    console.log($scope.user);
    $scope.companies = function () {
        //make a payload
        payload = {
            id: $scope.user.company_id + '.' + $scope.user.branch_id,
            token_key: md5(md5($scope.user.company_id + '.' + $scope.user.branch_id))
        };

        $http({
            url: 'http://sync.safavisa.com/api/v1/groups',
            method: 'get',
            params: {payload: JSON.stringify(payload)}
        }).then(function (res) {
            //if(res.data.errors)
            //popup.message('×طأ', res.data.errors);

            $scope.groups = res.data.data;
        });

        $http({
            url: 'http://sync.safavisa.com/api/v1/contracts',
            method: 'get',
            params: {payload: JSON.stringify(payload)}
        }).then(function (res) {
            $scope.contracts = res.data.data;
        });

    };

    $scope.companies();

    $scope.send = function () {

        $http({
            url: 'http://sync.safavisa.com/api/v1/mutamers/group/' + $scope.form.group.Id,
            method: 'post',
            params: {payload: JSON.stringify(payload)}
        }).then(function (res) {


            object = {
                grow: $scope.form.group,
                Contract: '',
                passports: res.data.data
            };
            $http({
                url: 'http://offline.safavisa.com/uasp/send_group/'+$scope.form.group.Id,
                method: 'post',
                data: {token: $scope.user.token}
            }).then(function (res) {
//json base64 data
                alert("تم ارسال البيانات للمخاع");

            }).error(function(){
                alert("خطأ، يرجي الرجوع للدعم الفني");
            });
        });

    };

});