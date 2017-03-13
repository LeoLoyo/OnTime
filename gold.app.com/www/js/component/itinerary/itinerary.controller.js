(function(){
	angular.module('Gold.itinerary',[])
	.controller('AppointmentCtrl', AppointmentCtrl)
	.factory('ITINERARY', ITINERARY)
	.component('itineraryUser',{

			templateUrl:'js/component/itinerary/itinerary.html',
			
			controller: ItineraryCtrl,

			controllerAs:'vm'
		
		})

	.component('appointmentSchedule',{
			bindings:{

				cita:'<'
			},

			templateUrl:'js/component/itinerary/appointment.html',
			
			controller: AppointmentCtrl,

			controllerAs:'vm'
		
		});


	function AppointmentCtrl(ITINERARY, $ionicLoading, $state, $cordovaGeolocation, $ionicPlatform, USER, API){

		var vm = this;

		vm.position = {};

		vm.$onInit = function(){

			vm.appointment = ITINERARY.getOneItinerary(vm.cita); 

		};

		vm.$onChanges = function(e){

			vm.$onInit();

		};

		vm.startWork = function(){

			vm.getPosition(function(myPosition){

				var data = {

					userId : USER.getUser().id,

					position : myPosition,

					timeStartGps : new Date().getTime()
				};

				var req = {
					
					url: '/attendance/' + vm.cita +'/',

					params:data
				};

				return API.post(req).then(function(res){

					console.log(res);				
				
				});

			});

		};
		
		vm.finishWork = function(){
			
			alert('Save Position')
		};

		vm.getPosition = function(next){

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0,
				duration: 2000,
				template: '<p>Sending Gps data...</p><ion-spinner></ion-spinner>'
			});
	
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

					next(vm.position);
			    }, function(err) {
			    	
					$ionicLoading.hide();

					console.log('Ha Ocurrido un error: ' + angular.toJson(err));

			  });

			})			

		};
		
		return vm;
	
	}

	function ItineraryCtrl(API, USER, ITINERARY, $scope, $state,  $ionicModal, $timeout) {

		var vm = this;

		vm.appointment = '';

		vm.$onInit= function(){
			
			vm.getItinerary()
		
		};

		vm.itinerary = [];

		vm.getItinerary = function(){

			var data = {};

			var req = {
				
				url: '/employees/' + USER.getUser().id + '/itinerary',

				params:data
			};

			return API.get(req).then(function(res){

				$scope.$broadcast('scroll.refreshComplete');
				
				vm.itinerary = res.data;
				
				if(res.data.length > 0){

					ITINERARY.setItinerary(res.data);			
				
				}else{
					
					API.toas('Sin Tareas Programadas')

				}
			
			});

		};

		$ionicModal.fromTemplateUrl('modalAppointment',function(modal){
			
			vm.modal = modal

			}, {
				
			scope: $scope,
			
			animation: 'slide-in-up',

			focusFirstInput: true
		
		});
		
		vm.openModal = function(_id) {

			vm.appointment = _id;	
			
			vm.modal.show();
		
		};

		vm.closeModal = function() {
		
			vm.modal.hide();
		
		};

		return vm;
	
	}

	function ITINERARY (API){

		var Itinerary = [];

		return{


			setItinerary:function(array){

				Itinerary = array;
			
			},
			getItinerary:function(){

				return Itinerary;
			
			},
			getOneItinerary:function(_id){
				for (var i = 0; i < Itinerary.length; i++) {
					if(Itinerary[i].id === _id){
						return Itinerary[i];
					}
				}
			
			}

		}

	}

})();