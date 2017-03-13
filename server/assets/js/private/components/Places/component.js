(function(){
	'use strict';

	angular.module('ComponentPlaces',[])

	.component('adminPlaces', {

	    bindings: {},

	    controller: 'PlacesCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Places/Places.html'

	  })

	.controller('PlacesCtrl', PlacesCtrl);


	function PlacesCtrl(PLACES, $scope, $mdPanel, lodash) {

	    var vm = this;

	    vm.place = {};

	    vm.$onInit = function () {

			io.socket.get('/places', function (data) {

				vm.places = data;

				PLACES.setPlaces(data)

				$scope.$digest();

			});

		    vm.optionsMap = {

		      center: new google.maps.LatLng(10.017061, -69.271765),

		      zoom: 17,

		      mapTypeId: google.maps.MapTypeId.SATELLITE

		    };

		    vm.map = new google.maps.Map(document.getElementById("mapPlaces"), vm.optionsMap);

		    var input = document.getElementById('pac-input');

			var searchBox = new google.maps.places.SearchBox(input);

			vm.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			
			searchBox.addListener('places_changed', function() {
			    
			    var places = searchBox.getPlaces();

			    if (places.length == 0) {
			    
			      return;
			    
			    }

			    var bounds = new google.maps.LatLngBounds();
			    
			    places.forEach(function(place) {

			      if (place.geometry.viewport) {

			        bounds.union(place.geometry.viewport);

			      } else {

			        bounds.extend(place.geometry.location);
			     
			      }
			   
			    });
			   
			    vm.map.fitBounds(bounds);
			 
			});

		    vm.initialize = function () {

		        vm.itemStep2 = false;

				var drawingManager = new google.maps.drawing.DrawingManager({

					drawingMode: google.maps.drawing.OverlayType.POLYGON,

					drawingControl: false,

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

					$scope.$apply(function(){

						vm.place.paths = polygon.getPath().b;

						vm.itemStep2 = true;

					});

				});

		    };

			vm.initialize();
	    
	    };
	    


        vm.saveNewPlaces = function (Place) {

	      if(vm.place.description && vm.place.paths.length >= 3){
	      
	        io.socket.post('/places', vm.place, function (res) {

	          alert(res);
	  
	        }); 
	      }

	    };

        vm.drawPlace = function(place){

			if(vm.placeActual!==undefined){

				vm.placeActual.setMap(null);

			}
			vm.placeActual = new google.maps.Polygon({
	              paths: place.paths,
	              strokeColor: '#000000',
	              strokeOpacity: 1,
	              strokeWeight: 3,
	              fillColor: '#000000',
	              fillOpacity: 0.35,
	              map: vm.map
	            });

	    };

	    $scope.$watch('vm.place.description',function(res){

			if(res !== undefined && res!==''){

		    	vm.itemStep1 = true;

			}else{
				
		    	vm.itemStep1 = false;

			}	
	    });

	    io.socket.on('refreshPlaces', function (data) {

	      vm.$onInit();
	    
	    });

	    return vm;
	  
	}

})()