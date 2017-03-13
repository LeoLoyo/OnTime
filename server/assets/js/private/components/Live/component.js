(function(){
	'use strict';

	angular.module('ComponentLives',[])

	.component('realTime', {

	    bindings: {},

	    controller: 'LiveCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Live/Live.html'

	  })

	.controller('LiveCtrl', LiveCtrl)

	function LiveCtrl($timeout) {

		var vm = this;

		vm.markers = [];

		vm.places = [];

		vm.users = [];

	    vm.$onInit = function () {

		    vm.optionsMap = {

		      center: new google.maps.LatLng(10.017061, -69.271765),

		      zoom: 17,

		      mapTypeId: google.maps.MapTypeId.SATELLITE

		    };

		    vm.map = new google.maps.Map(document.getElementById("mapLive"), vm.optionsMap);

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
	    };

	    vm.seeEmployees = function(){

	    	if(vm.markers.length >0){
	    		angular.forEach(vm.markers,function(marker){
	    			marker.setMap(null);
	    		})
	    	}

			io.socket.get('/position', function (data) {
				
				$timeout(function(){
					
					console.log(data.users)

					angular.forEach(data.users, function(user){
						
						var pos = new google.maps.LatLng(user.positions[user.positions.length-1].latitude, user.positions[user.positions.length-1].longitude);

						vm.markers.push(new google.maps.Marker({
							map: vm.map,
							
							title: user.firstName + '' +user.lastName,

							label:user.firstName + '' +user.lastName,
						    
						    animation: google.maps.Animation.DROP,
							
							position: pos
						}));

					},vm.users);


				
				},10);
		
			});
	    };


	    vm.seePlaces = function(){

	    	if(vm.places.length >0){

				angular.forEach(vm.places,function(place){

					place.setMap(null);

				});

	    	}

			io.socket.get('/places', function (data) {
				
				$timeout(function(){
					
					console.log(data)

					angular.forEach(data, function(_place){
						
						vm.places.push(new google.maps.Polygon({

							paths: _place.paths,

							strokeColor: '#c51162',

							strokeOpacity: 1,

							strokeWeight: 3,

							fillColor: '#c51162',

							fillOpacity: 0.35,

							map: vm.map

						}));

					},vm.places);
				
				},10);
		
			});

	    };
	    return vm;

	}

})()