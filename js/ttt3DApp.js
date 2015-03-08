angular
.module('ttt3DApp', ['firebase', 'ui.router'])
.config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('lounge', {
            url: '/',
            templateUrl: "lounge.html"
        })
        .state('gamespace', {
            url: '/gamespace',
            templateUrl: 'gamespace.html'
        })
};