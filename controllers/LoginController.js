starWars.controller("LoginController", ['$scope', '$rootScope','CommonService','$state','$cookies',function($scope, $rootScope,CommonService,$state,$cookies){
	$scope.user = {username:"",password:""};
	var numberOfSearches = 0;
	$scope.validateLogin = function(user){
		if(user.username && user.password){
			var isValidUser = false;
			var characters = CommonService.getPeoplesData();
			var findUser  = CommonService.findUser(characters,user);
			if(findUser){
				isValidUser = CommonService.validateUser(findUser,user);
				var userObject = {};
				userObject.name = user.username;
				userObject.isValid = true;
				$cookies.putObject('user',userObject);
				$rootScope.validUser = isValidUser;
				
			}	

			if(isValidUser){
				$scope.userInvalid = false;
				$state.go('user');
			}else{
				$scope.userInvalid = true;
				$scope.userInvalidMessage = "You have no force. You are not allowed.";
			}
		}else{
			$scope.userInvalid = true;
			$scope.userInvalidMessage = "Please enter your login details";
		}
	}
}]);