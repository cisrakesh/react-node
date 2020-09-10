const RideController = require("../controllers/ride.controller");
const { validateToken } = require('../services/util.service');

module.exports = (router, preFix) => {

    router.route(preFix+'/insert-ride-request')
        .post([validateToken],RideController.insertRideRequest )
    
    router.route(preFix+'/get-ride-details')
        .post([validateToken],RideController.getRideDetails )
    
    router.route(preFix+'/accept-ride-request')
        .post([validateToken],RideController.acceptRideRequest )
    
    router.route(preFix+'/get-ride-driver-details')
        .post([validateToken],RideController.getDriverOfRide )

    router.route(preFix+'/ride-started-by-driver')
        .post([validateToken],RideController.rideStartedByDriver )
    
    router.route(preFix+'/update-ride-root')
        .post([validateToken],RideController.updateRideRoot )
    
    router.route(preFix+'/end-ride')
        .post([validateToken],RideController.endRide )
};