/**
 * ShiftsController
 *
 * @description :: Server-side logic for managing shifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	saveShift : function(req, res, next){
		try{
	
			if(req.isSocket){
			
				var data  = req.params.all();

				Shifts.create(data).exec(function(err, shift){
					
					if(!err){

						sails.sockets.broadcast('Admins','NewShift', shift);

						res.json({error:false});

					}


				});
			}

		}catch(err){
			
			console.log(err);
		}


	},

	getShifts : function(req, res, next){
		try{
	
			if(req.isSocket){
			
				Shifts.find().exec(function(err,data){

					res.json({error:false, content:data});

				});
			}

		}catch(err){
			
			console.log(err);
		}

	},

	getShift : function(req, res, next){

	},

	editShift : function(req, res, next){

	},

	deleteShift : function(req, res, next){

	}

	
};

