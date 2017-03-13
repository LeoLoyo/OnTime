(function () {

  'use strict';

 angular.module('GoldApp')
  
  // Constant

  .constant('SERVER', 'http://192.168.10.109:1337')

  .constant('$ionicLoadingConfig', {
    
      template :'<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>',

      duration : 500
  
      })

  // Config

  .config(Config)

  // Controllers

  .controller('DashCtrl', DashCtrl)

  // Factories

  .factory('API', API)


  Config.$injec = ['$stateProvider', '$urlRouterProvider', '$sailsProvider', 'SERVER', '$ionicConfigProvider'];

  function Config($stateProvider, $urlRouterProvider, $sailsProvider, SERVER, $ionicConfigProvider) {
    
    $ionicConfigProvider.tabs.position('top'); //bottom
    
    $sailsProvider.url = SERVER;

    var layout = {

      auth : 'templates/auth.html',

      dashboard : 'templates/dashboard.html'

    };

    $stateProvider.state('auth', {

      url: '/auth',

      templateUrl : layout.auth,

      controller:function($http){
                $http.get('https://jsonplaceholder.typicode.com/posts').then(function(res)
    {
      console.log(res.data.length)
    })
      }



    }).state('dash', {

      url: '/dashboard',

      // abstract: true,

      templateUrl: layout.dashboard,
      
      controller: 'DashCtrl',

      controllerAs:'vm'

    })

    .state('dash.position', {
    
      url: '/position',
    
      views: {
    
        'tab-position': {
    
          template :'<position-user></position-user>'  
       
        }
    
      }
    
    })

    .state('dash.itinerary', {

      url: '/itinerary',

      views : {

        'tab-itinerary' :{

          template :'<itinerary-user></itinerary-user>'

        }

      }

    });

    $urlRouterProvider.otherwise('/auth');

  };

  function API($sails, SERVER, $cordovaToast) {

    var toas = function(msj){

      if(window.cordova){

        $cordovaToast.showLongBottom(msj);

      }else{

        console.log(msj)

      }
    
    };
    
    var getCallback = function (data, status, headers, config) {

      if(typeof data.data.error !== 'undefined'){
       
       if(data.data.content) toas(data.data.content[0]);
        
      }

      return data.data;

    };

    return {

      post: function (req) {

        var host = SERVER + req.url;
        
        return $sails.post(host, req.params).then(getCallback);

      },

      get: function (req) {

        var host = SERVER + req.url;

        return $sails.get(host, {params:req.params}).then(getCallback);

      },

      put: function(req){

        var host = SERVER + req.url;
        
        return $sails.put(host, req.params).then(getCallback);
      
      },

      delete: function(req){

        var host = SERVER + req.url

        return $sails.delete(host,{params : req.params}).then(getCallback);
      
      },

      toas : function(msj){

        return toas(msj)
      
      }
    }

  };

  function DashCtrl($sails,$scope, $ionicModal,API){
    
    var vm = this;

    vm.notifications = [];

    $ionicModal.fromTemplateUrl('modalNotifications', 

      function(modal){
      
        vm.modalNotifications = modal

      }, {
        
        scope: $scope
    });

  
  }



})();
