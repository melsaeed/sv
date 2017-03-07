myApp.controller("upload_imagesCtrl",function($scope, $location, $http){
    $scope.MainTitle = 'تحميل الصور';
    $scope.user = JSON.parse(window.localStorage.getItem('user'));

    console.log($scope.user);

    $scope.companies = function() {
        //make a payload
        payload = {
            id: $scope.user.company_id + '.' + $scope.user.branch_id,
            token_key: md5(md5($scope.user.company_id + '.' + $scope.user.branch_id))
        };

        $http({
            url: 'http://sync.safavisa.com/api/v1/cases',
            method: 'get',
            params: {payload: JSON.stringify(payload)}
        }).then(function(res){
            //if(res.data.errors)
            //popup.message('×طأ', res.data.errors);

            $scope.cases = res.data.data;
        });

        $http({
            url: 'http://sync.safavisa.com/api/v1/contracts',
            method: 'get',
            params: {payload: JSON.stringify(payload)}
        }).then(function(res){
            console.log(res.data);

            $scope.contracts = res.data.data;
        });

    };

    $scope.companies();

    $scope.send = function() {
        alert("Have nothing to do");
    };

});