/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes : {
    
    deviceToken : {

      type : "string",

      defaultsTo : null

    },

    facebookId : {
      
      type : "string"
    
    },
    
    userName : {
    
      type : "string"
    
    },

  	firstName : {

      type : "string"
    
    },

    lastName : {
    
      type : "string"
    
    },

    age : {
    
      type:"integer"
    },

    email : {
    
      type:"string"
    
    },

    password : {
    
      type:"string"
      
    },
    
    image : {
    
      type : "string",
    
      defaultsTo : "/images/users/default.jpg"
    
    },

    mobilePhone : {
    
      type : "integer"
    
    },

    positions : {
      
      collection : "positions",
      
      via : "user"
    },

    schedules : {
      
      collection : "schedules",
      
      via : "employee"
    },


  }
};

