angular
.module('ttt3DApp', ['firebase', 'ui.router', 'ngAnimate'])
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
        .state('gamefull', {
            url: '/gamefull',
            templateUrl: 'gamefull.html'
        });
};