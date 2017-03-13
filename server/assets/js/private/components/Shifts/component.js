(function(){
	'use strict';

	var app = angular.module('ComponentShifts',[]);

	app.component('adminShifts', {

	    bindings: {},

	    controller: 'ShiftCtrl',

	    controllerAs: 'vm',

	    templateUrl: 'js/private/components/Shifts/Shifts.html'

	 });
	
	app.controller('ShiftCtrl', ShiftCtrl);

	app.controller('PanelDialogCtrl', PanelDialogCtrl);

	
	function ShiftCtrl($scope, $mdPanel) {

		var vm = this;

	    vm.$onInit = function () {

			io.socket.get('/shifts', function (data) {

				$scope.$apply(function(){

					vm.shifts = data.content;

				});
	
			});
	    
	    };

	    vm.$onChanges = function (e){
	    	
	    	console.log(e)
	    
	    };
	    
	    vm.actualShift = function(shift){

	    	var copy = angular.copy(shift);
		
			copy.timeStart = new Date(shift.timeStart);

			copy.timeEnd = new Date(shift.timeEnd);
			
			return copy;
		
		};

		vm.panelShifts = function() {

			vm.position = $mdPanel.newPanelPosition().absolute().center();

			vm.config = {
				attachTo: angular.element(document.body),
				controller: PanelDialogCtrl,
				controllerAs: 'vm',
				// disableParentScroll: this.disableParentScroll,
				disableParentScroll: false,
				templateUrl: 'panelShifts.html',
				hasBackdrop: true,
				// panelClass: 'PanelShifts',
				panelClass: 'demo-dialog-example',
				position: vm.position,
				trapFocus: true,
				zIndex: 150,
				clickOutsideToClose: true,
				escapeToClose: true,
				focusOnOpen: true
			};

			$mdPanel.open(vm.config);

		}

	    io.socket.on('NewShift', function (shift) {

			$scope.$apply(function(){
		
				vm.shifts.push(shift);

			});
	    
	    });

	    return vm;

	}

	function PanelDialogCtrl(mdPanelRef){
		
		var vm = this;

		vm._mdPanelRef = mdPanelRef;

		vm.closeDialog = function () {

			var panelRef = vm._mdPanelRef;

			panelRef && panelRef.close().then(function () {

				angular.element(document.querySelector('.demo-dialog-open-button')).focus();

				panelRef.destroy();
			});
		
		};
		
		vm.saveNewShifts = function(newShift){

			io.socket.post('/shifts', newShift, function(data){
			
				vm.closeDialog();
			
			});
	    
	    };

	    return vm;
	
	} 

})()