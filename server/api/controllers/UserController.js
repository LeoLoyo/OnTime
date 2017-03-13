/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	signUp : function (req, res, next) {		
		try{

			var data =  req.params.all();
			
			findUser(data);


		}catch(error){

			console.log("UserController > createUser > 0: " + error);

			res.json({error:true,content:["Ha ocurrido un problema inesperado","Por favor intentalo más tarde"]});
		}
	
		function findUser(data){

			Users.findOne({email:data.email}).exec(function (err, finn){
			
				if(!err){

					if(!finn){				

						createUser(data);
				
					}else{
				
						res.json({
				
							error : true,
				
							content : ["El correo ya está siendo usado por otro usuario"]
				
						});
					
					}
				}else{

					res.json(false)
				}

			});

		}

		function createUser(data){

			try{

				Users.create(data).exec(function(error,user){

					if(!error && user){

						sails.sockets.broadcast('Admins','NewUser', user);
		
						res.json({
					  	
							user : user,

							content : ["Registro Exitoso"]

						});
					
					}

				});

			}catch(error){

				console.log("UserController > createClient > 5: "+error);

				res.json({

					error : true,

					content : ["Lo sentimos, hemos tenido un problema en el servidor","Por favor intentalo más tarde"]
				});
		
			}
		
		}
	
	},

	signIn : function(req, res, next){
		try{

			if (req.isSocket) {
			
				var data = req.params.all();

				console.log(req.socket.id)	
			
				var roomName= "Admins";

				sails.sockets.join(req.socket.id, 'Admins', function(err) {
					
					// return res.json({

						// message: 'Subscribed to a fun room called '+roomName+'!'

					// });

				});

				Users.findOne({email:data.email,password:data.password}).exec(function(err, user){

					if(!err){

						if(user){

							res.json({

								user : user,

								error:false, 

								content:["Sesion Inicida"]
							});

						}else{

							res.json({

								error : false, 

								content : ["Datos Incorrectos"]
							});

						}

					}

				});
			}

		}catch(error){

			console.log("UserController > signIn: " + error);

			res.json({

				error : true,

				content : ["Lo sentimos, hemos tenido un problema en el servidor","Por favor intentalo más tarde"]
			});

		}		

	},

	getEmployees :function(req, res, next){
		// if(req.isSocket){
			try{
				Users.find().exec(function(err,users){
					if(!err){
						res.json({content:users});
					}
				});
			}catch(err){
				console.log(err)
			}
		// }
	},

	getItinerary : function (req, res, next) {
		try{

			var data = req.params.all();

			Schedules.find({employee:data.userId}).populate('employee').populate('place').populate('shift').exec(function(err,data){
				console.log(data)
				if(!err){

					res.json({data:data,error:false});
					
				}

			});

		}catch(err){
			res.json(res)
		}
	
	}


};

