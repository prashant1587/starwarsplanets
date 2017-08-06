starWars.controller("UserController", [ '$rootScope','CommonService','$state','$filter','allPlanets','$cookies',function($rootScope,CommonService,$state,$filter,allPlanets,$cookies){
	var userCtrl = this;
	userCtrl.planetObj = {planet:""};
	userCtrl.planets = [];
	var planets = [];
	var planets = allPlanets;
	var numberOfSearches = 0;
	var startTime = 0;
	userCtrl.searchPlanets = function(){
		if(numberOfSearches == 0){
			startTime = new Date().getTime();
		}
		var currentTime = new Date().getTime();
		if((currentTime-startTime)/60000>1){
			numberOfSearches = 0;
		}
		if(userCtrl.planetObj.planet && ($rootScope.user.toLowerCase()=="luke skywalker" || numberOfSearches<=15)){
			userCtrl.planets = planets.filter(function(planet){
				return planet.name.toLowerCase().indexOf(userCtrl.planetObj.planet.toLowerCase())!==-1;
			})
		}else{
			numberOfSearches++;
			userCtrl.planets = [];
		}
		if($rootScope.user.toLowerCase()!=="luke skywalker" && numberOfSearches>15){
			userCtrl.errorMessage = "The Force is not strong enough. You can search only 15 times a minute";
		}else{
			userCtrl.errorMessage = "";
		}
	};

	userCtrl.getStyle = function(index){
		return CommonService.getStyleObject(index);
	};

	

	userCtrl.LogOut = function(){
		$cookies.remove('user');
		$rootScope.user = null;
		$rootScope.validUser = false;
		$state.go('login');
	}

}]);