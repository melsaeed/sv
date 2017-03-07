safa.controller('splashCtrl', function ($scope, $http, $rootScope, $location) {
    
    setTimeout(function(){
            $http({
              url: api_url + 'profile',
              method: 'get'
            }).then(function(res){
                if(res.data.error)
                {
                  window.localStorage.clear();
                  $location.path('login');
                }
                else
                {
                  $location.path('dashboard');
                }
            }).catch(function(){
                  window.localStorage.clear();
                  $location.path('login');
            });
    }, 3000);
    
});
