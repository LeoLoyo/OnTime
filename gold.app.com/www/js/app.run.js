(function(){

  'use strict';

  angular.module('GoldApp', [
    'ionic', 
    'ngCordova', 
    'Gold.auth', 
    'Gold.position', 
    'Gold.itinerary', 
    'ngSails',
    'notifications'
    ])
  .run(Run)

  .factory('USER', USER)

  function Run($ionicPlatform) {

    $ionicPlatform.ready(function() {
    
      if (window.cordova && window.cordova.plugins.Keyboard) {
    
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    
        cordova.plugins.Keyboard.disableScroll(true);
    
      }
    
      if (window.StatusBar) {
    
        StatusBar.styleDefault();
      }
    
    });

  }

  function USER(){

    var self = this;
    
    self.user = {};
    
    return {

      getUser : function(){
      
        return self.user;
      
      },

      setUser : function(user){
      
        self.user = user;
      
      },
    
    } 
  
  }

})();

