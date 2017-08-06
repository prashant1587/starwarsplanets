starWars.service('CommonService',['$http','$q','$localStorage',function($http,$q,$localStorage){
	var getPeoplesUrl = "https://swapi.co/api/people?callback=JSON_CALLBACK";
	var getPlanetsUrl = "https://swapi.co/api/planets?callback=JSON_CALLBACK";
	var peoplesData = {};

	function setPeoplesData(characters){
		peoplesData = characters;
	}

	this.getPeoplesData = function(){
		return peoplesData;
	};


	(function getAllPeople(){
		if($localStorage.userData){
			setPeoplesData($localStorage.userData);
		}else{
		$http({
	            url: getPeoplesUrl,
	            method: "GET",
	            params: { 'v': new Date().getTime() },
	            cache: false
	         }).then(function(data){
	         	if(data && data.data && data.data.results){
	         		$localStorage.userData = data.data.results;
	         		setPeoplesData(data.data.results);
	         	}
	         })
	     }
	})();

	this.findUser = function(characters,user){
		var findUser = {};
		for(var i=0;i<characters.length;i++){
			if(characters[i].name.toLowerCase()===user.username.toLowerCase()){
				findUser = characters[i];
				break;
			}
		}
		return findUser;
	}

	this.validateUser = function(findUser,user){
		return findUser.birth_year===user.password;
	};

	this.getAllPlanets = function(){
		var deferred = $q.defer();
		if($localStorage.planetsData){
			deferred.resolve($localStorage.planetsData);
		}else{
		$http({
	            url: getPlanetsUrl,
	            method: "GET",
	            params: { 'v': new Date().getTime() },
	            cache: false
	         }).then(function(data){
	         	if(data && data.data && data.data.results){
	         		$localStorage.planetsData = data.data.results;
	         		deferred.resolve(data.data.results);
	         	}else{
	         		deferred.resolve({});
	         	}
	         })
	     }
        return deferred.promise;
	};	

	this.getStyleObject = function(index){
		var styleObj = {};
		styleObj['font-size'] = (45-(index*3))+'px';
		var decIndex = Math.floor(((index+55)/100)*16777215);
		styleObj['color'] = get_random_color(decIndex);
		return styleObj;
	};

	function get_random_color(index) {
	  function c(value) {
	  	if((index+value)<256){
	  		index = index+value;
	  	}else{
	  		index = index-value;
	  	}
	    var hex = index.toString(16);
	    return ("0"+String(hex)).substr(-2); // pad with zero
	  }
	  return "#"+c(10)+c(50)+c(60);
	}

	
}]);