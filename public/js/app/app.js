'use strict';

/* App Module */
var App = angular.module('App',['ngRoute','AppControllers','firebase','ngCookies','ngAnimate','ngResource']);

App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller:'MainController'
      }).
      when('/home/:projectKey', {
        templateUrl: 'partials/project.html',
        controller:'ProjectController'
      }).
      when('/projects', {
        templateUrl: 'partials/projects.html',
        controller:'MainController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);


App.factory('Project', function($resource) {
    return $resource('/api/projects/:_id',{ id:'@_id'},
    {
      'create':{method:'POST'},
      'index': {method:'GET',isArray:true},
      'show':{method:'GET',isArray:false},
      'update':{method:'PUT'},
      'destroy':{method:'DELETE'}
    }

      );
  });