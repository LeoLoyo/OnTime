/**
 * Schedules.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	place :{

  		model: 'places'
  	},

  	shift : {

  		model: 'shifts'
  	},

    employee : {

      model : 'users'
    },

  	scheduledAppointment : {

  		type : 'datetime'
  	},

  	defineTo:{
  	
  		model: 'users'
  	
  	}

  }

};

