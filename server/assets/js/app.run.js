(function () {

  'use strict';

  angular.module('GoldApp')

  .run(Run)

  .controller('DashboardCtrl', DashboardCtrl)

  // .controller('PlacesMapCtrl', PlacesMapCtrl)

  // .component('placesMap', {
  //   bindings: {
  //     map: '='
  //   },

  //   controller: 'PlacesMapCtrl',

  //     controllerAs: 'vm',

  //     templateUrl: 'templates/_placesMap.html'

  // })
  .service('PLACES', Places);
  function Run() {

    console.log('Run');
  };

  function DashboardCtrl(PLACES, $timeout,$scope, $mdSidenav) {
    
    var vm = this;

    $scope.openLeftMenu = function() {

      $mdSidenav('left').toggle();
    
    };
    
    vm.users = [];

    vm.user = {};

    vm.polygon = {};

    vm.divMap = angular.element(document.getElementById("map"));

    // vm.optionsMap = {

    //   center: new google.maps.LatLng(10.017061, -69.271765),

    //   zoom: 17,

    //   // mapTypeId: google.maps.MapTypeId.TERRAIN
    //   mapTypeId: google.maps.MapTypeId.SATELLITE
    // };

    // vm.map = new google.maps.Map(document.getElementById("map"), vm.optionsMap);

    vm.signIng = function () {

      var Data = {

        name: 'Leonardo'

      };

      io.socket.post('/signin', Data, function (res, jwres) {
        console.log(res);
      });
    };

    vm.initialize = function () {

      var drawingManager = new google.maps.drawing.DrawingManager({

        drawingMode: google.maps.drawing.OverlayType.POLYGON,

        drawingControl: false,

        // drawingControlOptions: {
        //     position: google.maps.ControlPosition.TOP_CENTER,
        //     drawingModes: [ 
        //                     google.maps.drawing.OverlayType.POLYGON
        //                   ]
        // },
        // markerOptions: {
        //     icon: 'images/car-icon.png'
        // },

        polygonOptions: {
          fillColor: '#BCDCF9',
          fillOpacity: 0.5,
          strokeWeight: 2,
          strokeColor: '#57ACF9',
          clickable: false,
          editable: false,
          zIndex: 1
        }
      });

      drawingManager.setMap(vm.map);

      google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {

        vm.polygon.paths = polygon.getPath();

        // var micasa = new google.maps.Marker({
        //     position: {lat: 10.017061, lng: -69.271765},
        //     map: vm.map
        //   });
        // console.log(micasa.position)

        // console.log(google.maps.geometry.poly.containsLocation(micasa.position, polygon));

        // document.getElementById('info').innerHTML += "polygon points:" + "<br>";

        // for (var i = 0; i < polygon.getPath().getLength(); i++) {

        //   document.getElementById('info').innerHTML += "[" + polygon.getPath().getAt(i).toUrlValue(6) + "]<br>";

        // }

        // polygonArray.push(polygon);
      });
    };

    vm.savePlace = function () {

      if(vm.polygon.description){
      
        io.socket.post('/places', vm.polygon, function (res) {

          alert(res);
  
        }); 
      }

    };

    io.socket.on('message', function (data) {

      vm.punto = "Nuevo Punto";
      $scope.$digest();
    });

    vm.signIng();

    // vm.initialize();
  }

  // function PlacesMapCtrl(PLACES, $scope) {

  //   var vm = this;

  //   vm.$onInit = function () {

  //     io.socket.get('/places', function (data) {

  //       vm.places = data;

  //       PLACES.setPlaces(data)
        
  //       $scope.$digest();

  //     });
      
  //   };

  //   vm.drawPlace = function(place){

  //     if(typeof Place === 'undefined'){

  //     var Place = new google.maps.Polygon({
  //             paths: place.paths.b,
  //             strokeColor: '#FF0000',
  //             strokeOpacity: 0.8,
  //             strokeWeight: 2,
  //             fillColor: '#FF0000',
  //             fillOpacity: 0.35,
  //             map: vm.map
  //           });
  //     }else{
  //       Place.setMap(null);
  //     }

  //   }; 

  //   io.socket.on('refreshPlaces', function (data) {

  //     vm.$onInit();
    
  //   });

  //   return vm;
  
  // }


  function Places() {

    var self = this;

    self.Places = [];

    return {
      
      setPlaces: function(places){
        
        self.Places = places;

        return self.Places;
      
      },
      
      getPlaces: function () {

        return self.Places;
      
      }

    };
  }
  
})();
