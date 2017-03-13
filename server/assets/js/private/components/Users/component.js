(function(){
	'use strict';

	angular.module('ComponentUsers',[])

	.component('adminUsers', {

	    bindings: {
	
	      // user: '=', 
	
	    },

	    controller: 'ListUserCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Users/_listUser.html'

	  })
	
	.component('summaryUser', {

	    bindings: {

	      user: '<',

	    },

	    controller: 'SummaryUserCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Users/_summaryUser.html'

	  })

	.controller('ListUserCtrl', ListUserCtrl)

	.controller('SummaryUserCtrl', SummaryUserCtrl)
	
	function ListUserCtrl($scope) {

		var vm = this;

	    vm.$onInit = function () {

			io.socket.get('/position', function (data) {

				vm.users = data.users;

				$scope.$digest();

			});

			vm.dialog = document.querySelector('#previewUser');

			if (! vm.dialog.showModal) {
        
	            dialogPolyfill.registerDialog(vm.dialog);
	        }
	    
	    };

	    vm.previewUser = function (user){

	    	vm.userActive = user;

	        vm.dialog.showModal();
	    };

		vm.closeDialog = function(event) {

			vm.dialog.close();

		};
	    
	    io.socket.on('NewUser', function (user) {

	      vm.users.push(user);
	    
	      $scope.$digest()
	    
	    });

	    io.socket.on('NewPosition', function (position) {

	      vm.$onInit();

	    });

	    return vm;

	}

	function SummaryUserCtrl(PLACES,$scope){
		var vm = this;

		vm.$onInit = function(){

			vm.places = PLACES.getPlaces();

		};

		vm.$onChanges = function(changes){
			vm.places = PLACES.getPlaces();

			if (typeof changes.user.id !== 'undefined'){

				LoadPlace();

			}

		};

	    function MatchPosition(position, place){

	      var polygono = new google.maps.Polygon({
	      
	        paths: place.paths.b
	      
	      });

	      var punto = new google.maps.Marker({
	      
	          position: {lat: position.latitude, lng: position.longitude},
	      
	      });

	      return google.maps.geometry.poly.containsLocation(punto.position, polygono);
	    }

	    function LoadPlace(){

			angular.forEach(vm.user.positions,function(position, id){

				angular.forEach(vm.places, function(place){

					if(vm.user.positions[id].position.place === 'Fuera De Zona' || !vm.user.positions[id].position.place){

						vm.user.positions[id].position.place = MatchPosition(position.position,place)?place.description:'Fuera De Zona';

					}

				});

			});

		}

		io.socket.on('NewPosition', function (position) {

			if(vm.user.id === position.user){

				vm.user.positions.push(position);
				
				LoadPlace();

				$scope.$digest();

			}

		});

	    return vm;
  
	}

})()