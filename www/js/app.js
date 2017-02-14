angular.module('imdbApp', ['ionic','ionic-material', 'ionMdInput','imdbApp.controllers','imdbApp.routing','imdbApp.directives','ionic-modal-select','tabSlideBox'])

.run(function($ionicPlatform, $rootScope, $ionicPopup, $http, $state) {

    $rootScope.URE_PRE = 'https://api.themoviedb.org/3/';
    $rootScope.AUTHORIZE = "";
    $rootScope.userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    /*Initial Oauth details here*/
    var api_key = 'cfb0f0748a91342f252f0157a4a31698';   
    $accessurl = $rootScope.URE_PRE + 'authentication/token/new?api_key=' + api_key;  
        $.ajax({ 
            method: 'GET', 
            url: $accessurl,
            dataType: 'json',
            crossDomain: true,      
            timeout:30000,
            success: function (response) {
                $rootScope.$apply(function(){
                console.log(response.request_token);
                 $rootScope.AUTHORIZE = response.request_token;
                 localStorage.setItem("api_key",api_key); 
                localStorage.setItem("AUTHORIZE",$rootScope.AUTHORIZE); 
                 });
            }
        });  
})