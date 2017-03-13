(function(){
	'use strict';

	angular.module('ComponentAttendances',[])

	.component('adminAttendances', {

	    bindings: {},

	    controller: 'AttendanceCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Attendances/Attendances.html'

	  })
	
	.controller('AttendanceCtrl', AttendanceCtrl);
	
	function AttendanceCtrl($timeout) {

		var vm = this;

	    vm.$onInit = function () {
	    	
	    	io.socket.get('/attendance', function (data) {
				
				$timeout(function(){

					var attendance = [];

					angular.forEach(data.content,function(atte){

						var polygon = new google.maps.Polygon({
			              paths: atte.place.paths
			            });

			            var pos = new google.maps.LatLng(atte.position.latitude, atte.position.longitude);
						
						atte.onPlaces = google.maps.geometry.poly.containsLocation(pos, polygon);

						var scheduledAppointment = new Date(atte.schedule.scheduledAppointment);
						var date1 = new Date(atte.shift.timeStart);
						var date2 = new Date(atte.timeStartGps);
				
						date1.setDate(scheduledAppointment.getDate());
						date1.setMonth(scheduledAppointment.getMonth());
						date1.setFullYear(scheduledAppointment.getFullYear());

						var timeDiff = date2.getTime() - date1.getTime();
						var diff = Math.ceil((timeDiff / 1000)/60);							
						
						switch(true){
							
							case (diff<=0):
								atte.delay = 'On Time';
								break;
						
							case (diff > 0 && diff <= 15):
								atte.delay = "Minor Delay ("+diff+" min)";
								break;
						
							case (diff>15):
								atte.delay = 'Delay ('+diff+' min)';
								break;
						}
		
						attendance.push(atte);
		
					},attendance);
			        
			        vm.attendance = attendance;

				})
	      });
	  
	    };

	    vm.$onChanges = function (e){	    
	  
	    };


	    io.socket.on('NewSchedule', function (shift) {

			$scope.$apply(function(){
				console.log('on')

			});
	    
	    });

	    return vm;

	}

})()