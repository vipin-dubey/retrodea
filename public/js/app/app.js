'use strict';

/* App Module */
var App = angular.module('App',['ngRoute','AppControllers','firebase','ngCookies','ngAnimate']);

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


App.factory('Project', ['$resource', function($resource) {
    return $resource('/api/projects/:_id');
  }]);