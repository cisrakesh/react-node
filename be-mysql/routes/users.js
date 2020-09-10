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
    
        
    router.route('/user/:userId')
        .get(UserController.getUser)
        
        
    router.route('/userinsert/:firstname')
        .get(UserController.insertUser); 
    
};
