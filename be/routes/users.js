const UserController = require("../controllers/user.controller");
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
        req.body[file.fieldname]=file;
        cb(null, Date.now() + file.originalname);
    }
})
var upload = multer({ storage: storage });

module.exports = (router) => {
    router.post('/signup', UserController.validate('signUp'), UserController.signup);
    router.post('/login', UserController.validate('login'), UserController.login);
    router.post('/uploadDocuments', upload.any(), UserController.uploadDocuments);
    router.route('/')
        .get(function(req,res){
            
            res.locals.message = "Welcome to RideAlong API";
            res.status(200);
            res.render("welcome");
        })
        
    router.route('/profile')
        .get(validateToken, UserController.getCurrentUser)
        .put([validateToken, UserController.validate('updateCurrentUser')], UserController.updateCurrentUser); 
     //, UserController.validate('updateDriverProfileData')   
    router.route('/profile-picture')
        .put([validateToken, upload.any(), UserController.validate('userProfilePic')], UserController.uploadUserProfilePic); 
        
        
     router.route('/driver-profile-data')
        .get(validateToken, UserController.getDriverProfileData)
        .put([validateToken, upload.any(), UserController.validate('updateDriverProfileData')  ],UserController.updateDriverProfileData); 
    
    router.route('/update-password')
        .put([validateToken, UserController.validate('updatePassword')], UserController.updatePassword); 
    
    router.route('/registerednumber')
        .post([UserController.validate('registerednumber')], UserController.isPhoneRegistered); 
    
    router.route('/change-password')
        .put([UserController.validate('change-password')], UserController.changePassword); 
        
    router.route('/user-list')
        .post([validateToken],UserController.getUserList); 

    // router.route('/get-vehicles')
    //     .post([validateToken],UserController.getVehiclecation )
    
};
