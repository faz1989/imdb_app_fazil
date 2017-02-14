// Routes
angular.module('imdbApp.routing', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    
    $stateProvider.state('movies',
    {
        url:'/movies',
        templateUrl:'movies.html',
        controller:'moviesCtrl'
    });

});
