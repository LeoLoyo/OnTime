/**
 * PositionsController
 *
 * @description :: Server-side logic for managing Positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	currentPosition : function(req, res, next){
		
		var data = req.params.all();
		
		Positions.create(data).exec(function(err,pos){

			sails.sockets.broadcast('Admins','NewPosition', pos);

			res.json({
			
				content : ['Save Position'], 

				position : pos

			});
		
		})
	},
	getPositions : function(req, res, next){
		
		var data = req.params.all();

		console.log(data);

		Positions.find({ user : data.user}).exec(function(err,pos){
			// if(!err) res.json({error:true});

			res.json({error:false, positions:pos, content:['Solicitud Exitosa']});

		})
	
	},
	getPositionsAll : function(req, res, next){
		
		var data = req.params.all();

		console.log(data);

		Users.find({}).populate('positions').exec(function(err,users){
			console.log('jajaj')
			// if(!err) res.json({error:true});

			res.json({error:false, users:users, content:['Solicitud Exitosa']});

		})
	
	}   
	
};

