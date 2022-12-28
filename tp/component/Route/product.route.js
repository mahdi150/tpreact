const router = require("express").Router() ;
const productController =require("../Controller/product.controller")

router.get("/all",productController.getAll);
router.get("/show/:ProductID",productController.getOne);
router.post("/new",productController.createProduct);
router.put("/edit/:ProductID",productController.updateProd) ;
router.delete("/delete/:ProductID",productController.deleteProd);

//router.put("/wishlist/:userID",productController.addTowishList) ;

module.exports = router ;
