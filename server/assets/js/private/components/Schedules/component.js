(function(){
	'use strict';

	angular.module('ComponentSchedules',[])

	.component('adminSchedules', {

	    bindings: {},

	    controller: 'ScheduleCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Schedules/Schedules.html'

	  })
	
	.controller('ScheduleCtrl', ScheduleCtrl);
	
	function ScheduleCtrl($scope) {

		var vm = this;

	    vm.$onInit = function () {
		    getSchedules();
	    };

	    vm.$onChanges = function (e){	    
	    };

	    vm.ProgramOfWork = {
	    
	    	scheduledAppointment:new Date()
	    
	    };

		vm.minDate = new Date(
			vm.ProgramOfWork.scheduledAppointment.getFullYear(),
			vm.ProgramOfWork.scheduledAppointment.getMonth() - 2,
			vm.ProgramOfWork.scheduledAppointment.getDate());

		vm.maxDate = new Date(
			vm.ProgramOfWork.scheduledAppointment.getFullYear(),
			vm.ProgramOfWork.scheduledAppointment.getMonth() + 2,
			vm.ProgramOfWork.scheduledAppointment.getDate());

		function getSchedules(){

			io.socket.get('/schedules', function (data) {

				$scope.$apply(function(){

					vm.schedules = data.content;
					
					if(!data.error) getSchedules();
			
				});

			});
		}

		function getShifts(){
		
			io.socket.get('/shifts',function(res){

				$scope.$apply(function(){
				
					vm.shifts = res.content;
				
				});
		
			});
		
		};

		function getPlaces(){
		
			io.socket.get('/places',function(data){

				$scope.$apply(function(){
				
					vm.places = data;

				});
		
			});
		
		};		

		function getUsers(){
		
			io.socket.get('/employees',function(data){

				$scope.$apply(function(){
				
					vm.users = data.content;
				
				});

		
			});
		
		};

		getUsers();
		
		getShifts();
		
		getPlaces();

		vm.saveProgramOfWork = function(req){

			io.socket.post('/schedules', req, function(res){

				console.log(res)
			
			});
	    
	    };

	    io.socket.on('NewSchedule', function (shift) {

			$scope.$apply(function(){
				
				getShedules();

			});
	    
	    });

	    return vm;

	}

})()