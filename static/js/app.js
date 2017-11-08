'use strict';   // See note about 'use strict'; below

var myApp=angular.module('myApp', ['ngRoute']);

myApp
    .config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '/static/partials/index.html',
                 controller: 'MainCtr',
                 // css: ''
             }).
             otherwise({
                 redirectTo: '/'
             });
    }])
    .run(function($rootScope, $templateCache) {
       $rootScope.$on('$viewContentLoaded', function() {
          $templateCache.removeAll();
       });
    });
