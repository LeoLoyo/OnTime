/**
 * PlacesController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savePlace : function(req, res, next){

		var data =  req.params.all();

		Places.create(data).exec(function(err,place){
			
			sails.sockets.broadcast('Admins','refreshPlaces');
		
		});

		res.json("place save!");

	},
	getPlaces : function(req, res, next){

		Places.find().exec(function(err,places){

			res.json(places);
		
		});

	},
	getPlace : function(req, res, next){
		
	},
	editPlace : function(req, res, next){

	},
	deletePlace : function(req, res, next){

	},
	
};

