const Categorie = require("../Model/categorie.model")
const Product = require("../Model/product.model")


module.exports.createCategorie = async(req,res)=>{
    try{
        let {nom} = req.body ;
        let newCategorie = new Categorie({
            nom: nom ,
        })
        let savedCat = await newCategorie.save();
        return res.status(200).json({
            success : true,
            savedCat
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}

module.exports.getAll = async (req,res)=>{
    try{

        let allCategorie = await Categorie.find();
        return res.status(200).json({
            success : true,
            allCategorie
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}
module.exports.getOne = async (req,res)=>{
    try{

        var nomCat= req.body.nom ;
        let categorieDetails= await Categorie.find({nom : nomCat});
        return res.status(200).json({
            success : true,
            categorieDetails
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}

module.exports.updateCat = async (req,res)=>{
    try{

        let {catID} = req.params;
        let catUpdated = await Categorie.findByIdAndUpdate(catID, {
            $set :{
                nom : req.body.nom
            }
        },{
            new :true
        });
        return res.status(200).json({
            success : true,
            catUpdated
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}


module.exports.deleteCat = async (req,res)=>{
    try{

        let {catID} = req.body;
        await Categorie.findByIdAndDelete(catID);
        return res.status(200).json({
            success : true,
            message : "categorie Deleted"
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}

// module.exports.findByCategory = async(req,res)=>{
//     try{
//     // let {catName}= req.body ;
//     // console.log(catName)
//     const cat = await Product.aggregate([{
//         $lookup :{
//             from : "categories" ,
//             localField : "nom",
//             foreignField : "category",
//             as : "products"
//         }
//     }])
//     // const Pds = await Product.find({categorie : })
//     console.log("test")
//     res.status(200).json({
//         success : true ,
//         cat
//     })
//     }catch(err){
//         return res.status(400).json({
//             success : false ,
//             message: err.message
//         })

//     }
// }

module.exports.findByCategory = async(req,res)=>{
    try{
    var nomCat= req.body.nom ;
    const categoryId = await Categorie.findOne({nom : nomCat }).select("_id") ; 
    console.log(nomCat)
    const pdsCat = await Product.find({categorie :categoryId }).populate(
        "categorie"
    ).lean()
    
    res.status(200).json({
        success : true ,
        pdsCat
    })
    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })

    }
}

// how find all products with specific category mongoose ?


