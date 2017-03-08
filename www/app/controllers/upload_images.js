safa.controller("upload_imagesCtrl",function($scope, $location, $http){
    $scope.MainTitle = 'تحميل الصور';
    $scope.user = JSON.parse(window.localStorage.getItem('user'));
    $scope.ready = false;

        payload = {
            id: $scope.user.company_id + '.' + $scope.user.branch_id,
            token_key: md5(md5($scope.user.company_id + '.' + $scope.user.branch_id))
        };
        
    $scope.start = function() {
        //make a payload
        
        

        $http({
            url: 'http://sync.safavisa.com/api/v1/cases',
            method: 'get',
            params: {payload: JSON.stringify(payload)}
        }).then(function(res){
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

        $http({
            url: 'http://offline.safavisa.com/MOFA/remote_captcha',
            method: 'post',
            data: $.param({token: window.localStorage.getItem("token")}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(res){
            $scope.image = (res.data.file['0']);
        });

    };

    $scope.send = function() {
        
        
                console.log($scope.form.case);

//        $http({
//            url: 'http://sync.safavisa.com/api/v1/mutamers/group/' + $scope.form.group.Id,
//            method: 'post',
//            params: {payload: JSON.stringify(payload)}
//        }).then(function (res) {
//
//
//        
//        console.log(res.data);
//       
//        });
        
        //{"Id":1,"Name":"moshtaha","UASP":1,"MOFAUser":"Moin mushtaha","MOFAPassword":"mushtaha@123@","username":"ea17970","password":"ea17970","export_offline":1,"server_id":0,"updated_date_time":"2017-01-28 14:04:36"}
                
//        $http({
//            url: 'http://offline.safavisa.com/MOFA/check_remote_login/'+$scope.form.num,
//            method: 'post',
//            data: $.param({token: window.localStorage.getItem("token"), contract: b64EncodeUnicode(JSON.stringify($scope.form.contract))}),
//            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//        }).then(function(res){
//            $scope.image = (res.data.file['0']);
//        });
        
        
        
        
    };
    
    $scope.start();


});