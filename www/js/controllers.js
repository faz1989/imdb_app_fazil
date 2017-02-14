// Controllers
angular.module('imdbApp.controllers', [])

/* Login form controller Start here */
.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$state,$ionicSideMenuDelegate,$ionicPlatform,$ionicHistory,$location, $ionicPopup, $rootScope) {	
	//back button handler
	$ionicPlatform.registerBackButtonAction(function() {
		if ($state.current.name === "index" || $location.path() === "/index") {
			console.log('exit');
			navigator.app.exitApp();
		} else {
			console.log('exist');
			$ionicHistory.goBack();
		}
	}, 100);	
	
	ionicMaterialInk.displayEffect();
	$ionicSideMenuDelegate.canDragContent(false)
	
	/* Login Function here */
	$scope.login = {};	
	$("#login").click(function() {
			if($("#email").val() && $("#password").val() != '')
			{
				$URL_login = $rootScope.URE_PRE +'authentication/token/validate_with_login?api_key='+localStorage.getItem("api_key")+'&username='+$("#email").val()+'&password='+$("#password").val()+'&request_token='+localStorage.getItem("AUTHORIZE");
				$.ajax({
					type: 'GET',
					url: $URL_login,
					dataType: 'json',
					crossDomain: true,		
					timeout:30000,
					success: function(response) {
					console.log(response);			
					$scope.$apply(function(){		
						$URL_login1 = $rootScope.URE_PRE +'authentication/session/new?api_key='+localStorage.getItem("api_key")+'&request_token='+response.request_token;
						$.ajax({
							type: 'GET',
							url: $URL_login1,
							dataType: 'json',
							crossDomain: true,		
							timeout:30000,
							success: function(response) {
							console.log(response);		
							//$state.go('movies',{},{reload:true});		
							localStorage.setItem("session_id",response.session_id); 
								window.location.href = "movies.html";
							},
										
						});
					})
					},
								
				});
		}
		else {
			alert("Enter valid details");
		}
		
});
	
})
/* Login form controller End here */

// movies controller
.controller('moviesCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$state,$ionicSideMenuDelegate,$ionicPlatform,$ionicHistory,$location, $ionicPopup, $rootScope) {	
	//back button handler
	$ionicPlatform.registerBackButtonAction(function() {
		if ($state.current.name === "movies" || $location.path() === "/movies") {
			console.log('exit');
			navigator.app.exitApp();
		} else {
			console.log('exist');
			$ionicHistory.goBack();
		}
	}, 100);	
	
	ionicMaterialInk.displayEffect();
	$ionicSideMenuDelegate.canDragContent(false)
	
	$scope.movies = [];
	$URL_login = $rootScope.URE_PRE +'movie/popular?api_key='+localStorage.getItem("api_key")+"&language=en-US&page=1";
	console.log($URL_login);
				$.ajax({
					type: 'GET',
					url: $URL_login,
					dataType: 'json',
					crossDomain: true,		
					timeout:30000,
					success: function(response) {
					console.log(response);				
					var count = Object.keys(response.results).length;
					console.log(count);
					for(var i=0; i<count; i++){
						$scope.$apply(function(){
							console.log(response.results[i]);
						$scope.movies.push(response.results[i]);
					});
					}
					return $scope.movies;
					
					},
								
				});

$scope.Movies=function(movies_id){
		window.location.href = "moviebyid.html?movie_id="+movies_id;
	}				

})

// end of movies controller

// movies controller
.controller('moviesbyidCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$state,$ionicSideMenuDelegate,$ionicPlatform,$ionicHistory,$location, $ionicPopup, $rootScope) {	
	//back button handler
	$ionicPlatform.registerBackButtonAction(function() {
		if ($state.current.name === "moviesbyid" || $location.path() === "/moviesbyid") {
			console.log('exit');
			navigator.app.exitApp();
		} else {
			console.log('exist');
			$ionicHistory.goBack();
		}
	}, 100);	
	
	ionicMaterialInk.displayEffect();
	$ionicSideMenuDelegate.canDragContent(false)

	function getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}

	var movieid = getUrlVars()["movie_id"];
	//alert(movieid);
	
	$scope.moviebyid = [];
	$URL_login = $rootScope.URE_PRE +'movie/'+movieid+'?api_key='+localStorage.getItem("api_key")+"&language=en-US";
	console.log($URL_login);
				$.ajax({
					type: 'GET',
					url: $URL_login,
					dataType: 'json',
					crossDomain: true,		
					timeout:30000,
					success: function(response) {
					console.log(response);		
					$scope.$apply(function(){
						$scope.moviebyid.push(response);
						$scope.type = response.genres[0].name;
					});
					return $scope.moviebyid;
					},
								
				});	

	$scope.addfav=function(movies_id){
		var dataVALUE = JSON.stringify({
		  "media_type": "movie",
		  "media_id": movies_id,
		  "favorite": true
		});
		console.log(dataVALUE);
		$URL_login = $rootScope.URE_PRE +'account/6453351/favorite?api_key='+localStorage.getItem("api_key")+"&session_id="+localStorage.getItem("session_id");
		console.log($URL_login);
				$.ajax({
					type: 'GET',
					url: $URL_login,
					dataType: 'json',
					header: 'content-type: application/json;charset=utf-8',
					data: dataVALUE,
					crossDomain: true,		
					timeout:30000,
					success: function(response) {
					console.log(response);		
					$scope.$apply(function(){
						
					});
					
					},
								
				});	
	}		

})

// end of movies controller