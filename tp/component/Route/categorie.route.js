const router = require("express").Router() ;
const catController =require("../Controller/categorie.controller")

router.get("/all",catController.getAll);
router.get("/show/:catID",catController.getOne);
router.post("/new",catController.createCategorie);
router.put("/edit/:catID",catController.updateCat) ;
router.delete("/delete/:catID",catController.deleteCat);
router.post("/findByCategory",catController.findByCategory)

module.exports = router ;