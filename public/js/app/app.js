'use strict';

/* App Module */
var App = angular.module('App',['ngRoute','AppControllers','ngCookies','ngAnimate','ngResource','btford.socket-io']);

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
    return $resource('/api/retros/:_id',{_id:'@_id'},
    {
      'create':{method:'POST'},
      'index': {method:'GET',isArray:true},
      'show':{method:'GET',isArray:false},
      'update':{method:'PUT'},
      'destroy':{method:'DELETE'}
    }

      );
  });

App.factory('socket', function ($rootScope) {
    var socket = io.connect();
            return {
              on: function (eventName, callback) {
                socket.on(eventName, function () {  
                  var args = arguments;
                  $rootScope.$apply(function () {
                    callback.apply(socket, args);
                  });
                });
              },
              emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                  var args = arguments;
                  $rootScope.$apply(function () {
                    if (callback) {
                      callback.apply(socket, args);
                    }
                  });
                })
              }
            };
  });
