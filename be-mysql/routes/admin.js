const UserController = require("../controllers/user.controller");
const SettingController = require("../controllers/setting.controller");
const CouponController = require("../controllers/coupon.controller");
const { validateToken, validateAdminToken } = require('../services/util.service');
const multer = require('multer');
var upload = multer().single('avatar');

var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'public/uploads');
    // },
    filename: function (req, file, cb) {
        req.body[file.fieldname]=file;
        cb(null, Date.now() + file.originalname);
    }
})
var upload = multer({ storage: storage });

module.exports = (router,preFix) => {

    router.post(preFix+'/login', UserController.validate('adminLogin'), UserController.adminLogin);
    
    router.route(preFix+'/adminProfile')
        .get(validateAdminToken, UserController.getCurrentAdmin)
        .put([validateAdminToken, UserController.validate('updateCurrentAdmin')], UserController.updateCurrentAdmin); 
  
    router.route(preFix+'/change-admin-password')
        .put([validateAdminToken, UserController.validate('updatePassword')], UserController.updatePassword); 

    router.route(preFix+'/getusers')
        .post([validateAdminToken], UserController.getUserList); 

    router.route(preFix + '/fair-setup')
        .get(validateAdminToken, SettingController.getSetting)
        .put([validateAdminToken], SettingController.updateSetting); 
    
    router.route(preFix + '/user-stats')
        .get(validateAdminToken, SettingController.getUserCounts)
    
    router.route(preFix+'/updateprofile')
        .put([validateAdminToken, upload.any(), UserController.validate('userProfilePic')], UserController.uploadUserProfilePic);

    router.route(preFix+'/getpendinguser')
        .put([validateToken], UserController.getPendingUserList); 

    router.route(preFix+'/activeaccount')
        .put([validateAdminToken], UserController.updatePendingUser);  

    router.route(preFix + '/driver-profile/:userId')
        .get([validateAdminToken], UserController.getDriverProfileDataAdmin)
        .put([validateAdminToken], UserController.updateDriverProfileDataAdmin);

    router.route(preFix+'/forget-password')
        .put(UserController.changeAdminPassword);  

    router.route(preFix+'/add-coupon')
        .put([validateAdminToken], CouponController.addCoupons);    

    router.route(preFix+'/get-coupon')
        .put([validateAdminToken], CouponController.getCouponList); 
        
    router.route(preFix+'/edit-coupon')
        .put([validateAdminToken], CouponController.updateCoupon); 

    router.route(preFix+'/delete-coupon')
        .put([validateAdminToken], CouponController.deleteCoupon); 

    router.route(preFix+'/getuserdriver-list')
        .post([validateAdminToken], UserController.getDriverUserList); 

        
    return router;
};