(function(){
	
	'use strict';

	var app = angular.module('Gold.auth',['ngSails']).component('authUser',{

			templateUrl:'js/component/auth/auth.html',

			controller: AuthCtrl,

			controllerAs:'vm'

		});

	function AuthCtrl($state, API, USER,$ionicLoading){

		var vm = this;

		vm.signUp = function(){

			var data = {

				firstName : 'Leonardo',

				lastName : 'Loyo',

				age : 56,

				email : 'cyberedward@gmail.com',

				password : '1234' ,

				passwordConfirm : '1234'
			};

			var req = {
				
				url: '/signup',

				params:data
			};

			return API.post(req).then(function(res){

				if(res.user){

					USER.setUser(res.user);

					$state.go('dash');
				}
				
	
			});

		}

		vm.signIn = function(){

			$ionicLoading.show()

			var data = {

				email : 'cyberedward@gmail.com',

				password : '1234'

			};
			
			var req = {
				
				url: '/signin',

				params:data
			};

			return API.post(req).then(function(res){

				if(res.user){

					USER.setUser(res.user);

					$state.go('dash');
				}

			});


		};

	}

})();
