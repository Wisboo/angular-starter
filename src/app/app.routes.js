angular.module('wisboo').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise( ($injector) => {
      $injector.get('$state').go('404');
    });

    $stateProvider
      .state('404', {
        url: '/not-found',
        views: {
          main: {
            templateUrl: '../app/layouts/error/404.html'
          }
        }
      })
      .state('home', {
        url: '/',
        views: {
          main: {
            templateUrl: '../app/components/home/home.html'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
