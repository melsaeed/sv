safa.service('lang', function ($http, $rootScope) {
  $http.get("app/language/arabic.json").then(function(res){
        this.get = res.data;
    });
  return this;
});