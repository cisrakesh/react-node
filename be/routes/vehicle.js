const VehicleController = require("../controllers/vehicles.controller");
const multer = require('multer');
var upload = multer().single('avatar')
const { validateToken } = require('../services/util.service');

/*==============================================================================================================================*/
/*==============================================================================================================================*/
/*Code For Upload An Image*/
/*==============================================================================================================================*/
/*==============================================================================================================================*/
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'public/uploads');
    // },
    filename: function (req, file, cb) {
        req.body[file.fieldname] = file;
        cb(null, Date.now() + file.originalname);
    }
})
var upload = multer({ storage: storage });

module.exports = (router, preFix) => {
    
    router.route(preFix+'/add')
        .post([validateToken, upload.any(), VehicleController.validate('addVehicle')], VehicleController.addVehicle);
    router.route(preFix + '/mylist')
        .get([validateToken], VehicleController.getDriverVehicle);
    router.route(preFix + '/types')
        .get(VehicleController.getVehicleType);
    router.route(preFix + '/view/:vehicleId')
        .get([validateToken],VehicleController.getVehicle);
    router.route(preFix + '/setactive')
        .put([validateToken], VehicleController.setVehicleActive);
};