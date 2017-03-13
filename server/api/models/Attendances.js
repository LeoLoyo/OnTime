/**
 * Attendances.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	
  	place :{

      model : 'places'

    },

    position :{

  		model : 'positions'

  	},

    shift :{
  
      model : 'shifts'

    },

    schedule :{
	
  		model : 'schedules'

  	},

  	employee: {

  		model : 'users'

  	},

  	timeWorked:{

  		type: 'datetime'

  	},
  	
  	commitmentDate:{

  		type: 'datetime'
  	
    },

  	timeStartGps:{

  		type: 'datetime'

  	},

  	timeEndGps:{

  		type: 'datetime'
  
  	},
  	
  	minuteDelay:{

  		type: 'datetime'

  	},
    
    observation : function(){

      if(minuteDelay >15){
        return 'Delay';

      }else if(minuteDelay>0){

        return 'minor Delay';

      }
    }


  }

};

