safa.controller('promosCtrl', function ($scope, $http, $rootScope, $location) {
    $scope.MainTitle = 'العروض';
    $scope.user = JSON.parse(window.localStorage.getItem('user'));
    payload = {
        id: $scope.user.company_id + '.' + $scope.user.branch_id,
        token_key: md5(md5($scope.user.company_id + '.' + $scope.user.branch_id))
    };
        
        //https://netapi.safavisa.com/ad/view/shared?token=d691c560a090b6c09e5c0f7891b0434508334f42&lang=ar&facilities=true&page=1&adware_type[]=1&adware_name=Name&adware_distance_from=1&adware_distance_to=111&adware_class=1&adware_price_from=111&adware_price_to=1111&adware_facilities[]=1&adware_orderby[]=1&adware_hotel_cities[]=1&adware_providers[]=1&adware_bus_brands[]=1&adware_bus_models[]=1&adware_bus_itos[]=1&adware_bus_trips[]=1&adware_bus_seats_from=1&adware_bus_seats_to=11&adware_flight_transporters[]=1&adware_flight_date_from=2017-01-15 00:00:00&adware_flight_date_to=2017-03-15 00:00:00&adware_flight_date=2017-03-15 00:00:00&adware_flight_nights=1&adware_flight_cities[]=1&adware_flight_port=1&adware_flight_seats_from=1&adware_flight_seats_to=11
        
    $scope.get = function(){
        $http({
            url: 'https://netapi.safavisa.com/ad/view/shared',
            method: 'get',
            params: {
                token: window.localStorage.getItem('token'),
                lang:'ar',
                facilities:true,
                page:1,
//                adware_type:[1],
//                adware_name:'Name',
//                adware_distance_from:1,
//                adware_distance_to:111,
//                adware_class:1,
//                adware_price_from:111,
//                adware_price_to:1111,
//                adware_facilities:[1],
//                adware_orderby:[1],
//                adware_hotel_cities:[1],
//                adware_providers:[1],
//                adware_bus_brands:[1],
//                adware_bus_models:[1],
//                adware_bus_itos:[1],
//                adware_bus_trips:[1],
//                adware_bus_seats_from:'1',
//                adware_bus_seats_to:'11',
//                adware_flight_transporters:[1],
//                adware_flight_date_from:'2017-01-15 00:00:00',
//                adware_flight_date_to:'2017-03-15 00:00:00',
//                adware_flight_date:'2017-03-15 00:00:00',
//                adware_flight_nights:1,
//                adware_flight_cities:[1],
//                adware_flight_port:'1',
//                adware_flight_seats_from:'1',
//                adware_flight_seats_to:'11'
            }
        }).then(function(res){
            $scope.data = res.data;
        });  
    };
  $scope.get();
  
});
