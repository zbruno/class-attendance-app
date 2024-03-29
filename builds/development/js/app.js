var myApp = angular.module('myApp', 
  ['ngRoute', 'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://attendancesimple.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegistrationController'
    }).
    when('/meetings', {
      templateUrl: 'views/meetings.html',
      controller:  'MeetingsController'
    }).
    when('/checkins/:uId/:mId', {
      templateUrl: 'views/checkins.html',
      controller:  'CheckInsController'
    }).
    when('/checkins/:uId/:mId/checkinsList', {
      templateUrl: 'views/checkinslist.html',
      controller:  'CheckInsController'
    }).
    otherwise({
      redirectTo: '/meetings'
    });
}]);
