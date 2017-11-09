'use strict';   // See note about 'use strict'; below

var myApp=angular.module('myApp', ['ngRoute']);

myApp
    .config(['$routeProvider', '$locationProvider',
     function($routeProvider, $locationProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '/static/partials/index.html',
                 controller: 'MainCtr',
                 // css: ''
             }).
             otherwise({
                 redirectTo: '/'
             });
         // $locationProvider.html5Mode(true);
         $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
    }])

    .run(function($rootScope, $templateCache) {
       $rootScope.$on('$viewContentLoaded', function() {
          $templateCache.removeAll();
       });
    });
