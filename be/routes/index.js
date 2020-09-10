const users = require('./users');
const vehicle = require('./vehicle');
const adminRoutes = require('./admin');
const rideRoutes = require('./rides')
module.exports = (router) => {
    users(router);
    vehicle(router,'/vehicle');
    adminRoutes(router,'/admin');
    rideRoutes(router, '/ride')
    return router;
};
