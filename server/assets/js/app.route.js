(function () {
  'use strict';

  angular.module('GoldApp').config(Router);

  Router.$injec = ['$stateProvider', '$urlRouterProvider'];

  function Router($stateProvider, $urlRouterProvider) {

    var layout = {

      main: 'main.html',

      dashboard: 'templates/dashboard.html'

    };

    $stateProvider

    // .state('dashboard', {

    //   url: '/dashboard',

    //   templateUrl: layout.dashboard,

    //   controllerAs: 'vm',

    //   controller: 'DashboardCtrl'

    // })
  
    .state('users', {

      url: '/users',

      template:'<admin-users></admin-users>' 

    })
  
    .state('places', {

      url: '/places',

      template:'<admin-places></admin-places>' 

    })

    .state('schedules', {

      url: '/schedules',

      template:'<admin-schedules></admin-schedules>' 

    })

    .state('shifts', {

      url: '/shifts',

      template:'<admin-shifts></admin-shifts>' 

    })

    .state('attendances', {

      url: '/attendances',

      template:'<admin-attendances></admin-attendances>' 

    })

    .state('live', {

      url: '/live',

      template:'<real-time></real-time>' 

    });

    // $urlRouterProvider.otherwise('/dashboard');
  
  };

})();
