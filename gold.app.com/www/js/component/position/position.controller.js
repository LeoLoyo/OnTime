(function(){

	'use strict';
	
	angular.module('Gold.position',[]).component('positionUser',{

			templateUrl:'js/component/position/position.html',

			controller: PositionCtrl,

			controllerAs:'vm'

		});

		function PositionCtrl($cordovaGeolocation, $http, $ionicPlatform, $ionicLoading, API, USER) {

			var vm = this;
			
			function showMap(coords) {

			    var map = new google.maps.Map(document.getElementById('map-canvas'), {
			    
			      center: {lat: coords.lat, lng: coords.long},
			    
			      zoom: 13
			    
			    });
			
			};

			vm.getPosition = function(){

				$ionicLoading.show({
			      template: 'Loading...'
			    })
		
				var posOptions = {

				  timeout : 10000,

				  enableHighAccuracy : false

				};

				$ionicPlatform.ready(function(){

				  $cordovaGeolocation

				    .getCurrentPosition(posOptions)

				    .then(function (position) {

						vm.position = {

							lat : position.coords.latitude,

							long : position.coords.longitude
						};

						// showMap(vm.position);

						$ionicLoading.hide();

				    }, function(err) {
				    	
						$ionicLoading.hide();

						console.log('Ha Ocurrido un error: ' + angular.toJson(err));

				  });

				})

			};

			vm.sendPosition = function(){

				console.log(USER.getUser().id)

				var data = {

					position : {
					
						latitude : vm.position.lat,
					
						longitude : vm.position.long
					
					},
					user : USER.getUser().id
				};

				var req = {
					
					url: '/currentposition',

					params:data
				};

				return API.post(req);

			};


		}



})();
