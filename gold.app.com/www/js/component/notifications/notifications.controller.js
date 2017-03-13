(function(){

	'use strict';
	
	angular.module('notifications',[])

	.component('modalNotifications',{
		
		bindings : {

			modal : '=',

			notifications : '='
		},

		templateUrl:'js/component/notifications/notifications.html',

		controller: NotificationsCtrl,

		controllerAs:'vm'

	})

	.controller('NotificationsCtrl', NotificationsCtrl)

	function NotificationsCtrl(API, $sails, $timeout, $state) {

		var vm = this;

		vm.$onInit = function(){
			console.log('Init Notifications')
		};

		vm.$onChanges = function(){};

		vm.goNotification = function(item){

			vm.modal.hide();

			var index = vm.notifications.indexOf(item);

			vm.notifications.splice(index,1);

			$state.go(item.link);


		
		};

		var newNotification = function(res){

			$timeout(function(){

				vm.notifications.push(res)

			},1);

		}

		$sails.on('NewSchedule',function(res){
			
			res.title = 'New scheduled task';

			res.description = 'My description';
			
			res.icon = 'ion-calendar';
			
			res.link = 'dash';
			
			return newNotification(res);

		});

		return vm;		

	}

})();
