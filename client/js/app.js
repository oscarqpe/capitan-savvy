angular
  .module('appEdutic', [
    'ngRoute',
    'ngCookies',
    'appServices',
    'ngToast',
    "googlechart",
    "ui.ace"
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/similarity/index.html',
        controller: 'SimilarityController'
      })
      .when('/similarities', {
        templateUrl: 'views/similarity/index.html',
        controller: 'SimilarityController',
        roles: "ALL"
      })
      .when('/details/:idPage/:distance/:idBranch/:idCourse/:idUnit/:similarity/:datos', {
        templateUrl: 'views/similarity/detail.html',
        controller: 'DetailController',
        roles: "ALL"
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
