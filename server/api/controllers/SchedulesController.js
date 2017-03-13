/**
 * SchedulesController
 *
 * @description :: Server-side logic for managing schedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveSchedule:function(req, res , next){
		if(req.isSocket){
			try{
				
				var data = req.params.all();
				
				Schedules.create(data).exec(function(err,shedules){
				res.json({content:'satisfactory record',error:false})
				sails.sockets.broadcast('Admins','NewSchedule', shedules);


				})


			}catch(err){
				console.log(err)
				res.json(err)

			}

		}
	},
	getSchedules : function(req, res, next){
		
		Schedules.find().populate('employee').populate('place').populate('shift').exec(function(err,shedules){
			res.json({content:shedules})
		});

	},

	getSchedule : function(req, res, next){

	},

	editSchedule : function(req, res, next){

	},

	deleteSchedule : function(req, res, next){

	},
};

