myApp.controller("loginCtrl", function($scope, $http, $location){
    $scope.login = function(){
        $('button').html("<i class='fa fa-spinner fa-pulse fa-fw'></i>");

        $http({
            url: 'http://login.safavisa.com/offline/auth/'+$scope.form.email+'/'+md5($scope.form.password)+'/'+$scope.form.key,
            method: 'get',
        }).then(function(res){
            if(res.data.error) {
                alert(res.data.message);
                $('button').html("دخول");
            }
            else
            {
                window.localStorage.setItem('login', JSON.stringify({email: $scope.form.email, password: md5($scope.form.password)}));
                window.localStorage.setItem('user', JSON.stringify(res.data));

                //console.log(JSON.parse(window.localStorage.getItem('user')));
                $location.path('dashboard');
            }
        });
    };

});