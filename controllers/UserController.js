starWars.controller("UserController", ['$scope', '$rootScope','CommonService','$state','$filter','allPlanets','$cookies',function($scope, $rootScope,CommonService,$state,$filter,allPlanets,$cookies){
	$scope.planetObj = {planet:""};
	$scope.planets = [];
	var planets = [];
	var planets = allPlanets;
	var numberOfSearches = 0;
	var startTime = 0;
	$scope.searchPlanets = function(){
		if(numberOfSearches == 0){
			startTime = new Date().getTime();
		}
		var currentTime = new Date().getTime();
		if((currentTime-startTime)/60000>1){
			numberOfSearches = 0;
		}
		if($scope.planetObj.planet && ($rootScope.user.toLowerCase()=="luke skywalker" || numberOfSearches<=15)){
			$scope.planets = planets.filter(function(planet){
				return planet.name.toLowerCase().indexOf($scope.planetObj.planet.toLowerCase())!==-1;
			})
		}else{
			numberOfSearches++;
			$scope.planets = [];
		}
		if($rootScope.user.toLowerCase()!=="luke skywalker" && numberOfSearches>15){
			$scope.errorMessage = "The Force is not strong enough. You can search only 15 times a minute";
		}else{
			$scope.errorMessage = "";
		}
	};

	$scope.getStyle = function(index){
		return CommonService.getStyleObject(index);
	};

	

	$scope.LogOut = function(){
		$cookies.remove('user');
		$rootScope.user = null;
		$rootScope.validUser = false;
		$state.go('login');
	}

}]);