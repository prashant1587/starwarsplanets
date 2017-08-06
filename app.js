var starWars = angular.module("starWars",['ui.router','ngCookies','ui.router.state.events','ngStorage']);

Array.prototype.sortByProp = function(p) {
    return this.sort(function(a,b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
};

window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

starWars.run(["$rootScope",'$cookies','$state', function($rootScope,$cookies,$state) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            var user = $cookies.getObject('user');

            if(user!==undefined){
                $rootScope.user = user.name;
                $rootScope.validUser = user.isValid;
            }
            if(toState.name!=="login"){
                if(!$rootScope.validUser){
                    event.preventDefault();
                    $state.go('login');
                }
            }else{
                if($rootScope.validUser){
                    event.preventDefault();
                    $state.go('user');
                }
            }
            
          
          });
        
}]);


starWars.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html'
        })

        .state('user', {
            url: '/user',
            templateUrl: 'templates/user.html',
            controller:"UserController",
            resolve: {
                allPlanets: function($stateParams, CommonService) {
                  return CommonService.getAllPlanets();
                },
            }  
        });
}]);
