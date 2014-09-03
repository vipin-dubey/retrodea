'use strict';

/* App Module */
var App = angular.module('App',['ngRoute','AppControllers','ngCookies','ngAnimate','ngResource']);

App.config(['$routeProvider','$resourceProvider', function($routeProvider,$resourceProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller:'ProjectController'
      }).
      when('/home/:projectKey', {
        templateUrl: 'partials/project.html',
        controller:'RetroController'
      }).
      when('/projects', {
        templateUrl: 'partials/projects.html',
        controller:'ProjectController'
      }).
      otherwise({
        redirectTo: '/home'
      });

       // Don't strip trailing slashes from calculated URLs
       $resourceProvider.defaults.stripTrailingSlashes = false;
  }]);


App.factory('Project', function($resource) {
    return $resource('/api/projects/:_id',{_id:'@_id'},
    {
      'create':{method:'POST'},
      'index': {method:'GET',isArray:true},
      'show':{method:'GET',isArray:false},
      'update':{method:'PUT'},
      'destroy':{method:'DELETE'}
    },{
        stripTrailingSlashes: false
    }

      );
  });

App.factory('Retro', function($resource) {
    return $resource('/api/retros/:_id',{ id:'@_id'},
    {
      'create':{method:'POST'},
      'index': {method:'GET',isArray:true},
      'show':{method:'GET',isArray:false},
      'update':{method:'PUT'},
      'destroy':{method:'DELETE'}
    }

      );
  });