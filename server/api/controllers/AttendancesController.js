/**
 * AttendancesController
 *
 * @description :: Server-side logic for managing attendances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getAttendance:function(req,res,next){
		if(req.isSocket){
			try{

				Attendances.find().populate('employee').populate('place').populate('shift').populate('schedule').populate('position').exec(function(err,att){
					if(!err) res.json({content:att,error:false})
				
				});

			}catch(err){
				console.log(err)
				res.json({error:true})
			}
		}
	},

	
	saveAttendance:function(req,res,next){
		var data = req.params.all();
		console.log(data);

			Schedules.find({
				employee : data.userId,
				id : data.AppointmentID
			}).exec(function(er,schedule){
				if(!er){
					Positions.create({
						user:data.userId,
						latitude : data.position.lat, 
						longitude : data.position.long
					}).exec(function(err,position){
						var dataSave = {
								schedule : schedule[0].id ,
								place : schedule[0].place,
								shift : schedule[0].shift,
								position : position.id,
								employee : data.userId,
								commitmentDate : schedule[0].scheduledAppointment,
								timeStartGps : new Date(data.timeStartGps)

							};
							console.log(schedule[0])
						if(!err){
							Attendances.create(dataSave).exec(function(erro,attendance){
								if(!erro){

									sails.sockets.broadcast('Admins','NewTaks', user);

									res.json({error:false,content:['Successful Registration']})
								}

							})
						}
					});


				}
			})

	},

};

