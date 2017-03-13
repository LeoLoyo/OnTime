/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  // 'GET /dashboard': {
  //   view: 'dashboard'
  // },


  
  // API REST FULL
    
    //Auth
  'POST /signup': {
    controller: 'UserController',
    action: 'signUp'
  },

  'POST /signin': {
    controller: 'UserController',
    action: 'signIn'
  },

  'GET /employees': {
    controller: 'UserController',
    action: 'getEmployees'
  },
  'GET /employees/:userId/itinerary': {
    controller: 'UserController',
    action: 'getItinerary'
  },

    //Position
  'POST /currentposition': {
    controller: 'PositionsController',
    action: 'currentPosition'
  },
  'GET /position': {
    controller: 'PositionsController',
    action: 'getPositionsAll'
  },
  'GET /position/:user': {
    controller: 'PositionsController',
    action: 'getPositions'
  },

    //Place
  'POST /places': {
    controller: 'PlacesController',
    action: 'savePlace'
  },
  'GET /places': {
    controller: 'PlacesController',
    action: 'getPlaces'
  },
  'GET /places/:placeId': {
    controller: 'PlacesController',
    action: 'getPlace'
  },
  'PUT /places/:placeId': {
    controller: 'PlacesController',
    action: 'editPlace'
  },
  'DELETE /places/:placeId': {
    controller: 'PlacesController',
    action: 'deletePlace'
  },
      //Shifts
  'POST /shifts': {
    controller: 'ShiftsController',
    action: 'saveShift'
  },
  'GET /shifts': {
    controller: 'ShiftsController',
    action: 'getShifts'
  },
  'GET /shifts/:shiftId': {
    controller: 'ShiftsController',
    action: 'getShift'
  },
  'PUT /shifts/:shiftId': {
    controller: 'ShiftsController',
    action: 'editShift'
  },
  'DELETE /shifts/:shiftId': {
    controller: 'ShiftsController',
    action: 'deleteShift'
  },
        //Schedules
  'POST /schedules': {
    controller: 'SchedulesController',
    action: 'saveSchedule'
  },
  'GET /schedules': {
    controller: 'SchedulesController',
    action: 'getSchedules'
  },
  'GET /schedules/:scheduleId': {
    controller: 'SchedulesController',
    action: 'getSchedule'
  },
  'PUT /schedules/:scheduleId': {
    controller: 'SchedulesController',
    action: 'editSchedule'
  },
  'DELETE /schedules/:scheduleId': {
    controller: 'SchedulesController',
    action: 'deleteSchedule'
  },
  //Attendace
  'GET /attendance': {
    controller: 'AttendancesController',
    action: 'getAttendance'
  },  
  'POST /attendance/:AppointmentID': {
    controller: 'AttendancesController',
    action: 'saveAttendance'
  },


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
