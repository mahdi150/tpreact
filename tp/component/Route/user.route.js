const router = require("express").Router() ;
const userController =require("../Controller/user.controller")
const authController =require("../Controller/auth.controller")

router.get("/all",userController.getAllUsers);
router.get("/show/:userID",userController.showUser);
router.post("/new",userController.createUser);
router.put("/edit/:userID",userController.updateUser) ;
router.delete("/delete/:userID",userController.deleteUser);
router.put("/wishlist/:userID/add",userController.addTowishList) ;
router.post("/signup",userController.createUser);
router.post("/login",userController.login11);
//router.put("/wishlist/:userID/deleteOne",userController.addTowishList) ;

module.exports = router ;


