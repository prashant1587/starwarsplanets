starWars.controller("LoginController", ['$rootScope','CommonService','$state','$cookies',function( $rootScope,CommonService,$state,$cookies){
	var loginCtrl = this;
	loginCtrl.user = {username:"",password:""};
	var numberOfSearches = 0;
	loginCtrl.validateLogin = function(user){
		if(user && user.username && user.password){
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
				loginCtrl.userInvalid = false;
				$state.go('user');
			}else{
				loginCtrl.userInvalid = true;
				loginCtrl.userInvalidMessage = "You have no force. You are not allowed.";
			}
		}else{
			loginCtrl.userInvalid = true;
			loginCtrl.userInvalidMessage = "Please enter your login details";
		}
	}
}]);