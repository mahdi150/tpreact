const Product = require("../Model/product.model")
const User = require("../Model/user.model")


module.exports.createProduct = async(req,res)=>{
    try{
        let {
            title ,
            description,
            image_Product,
            price,
            categorie
            
        } = req.body ;
        let newProduct = new Product({
            title: title ,
            description : description ,
            image_Product : image_Product ,
            price : price,
            categorie : categorie 
        })
        let savedCat = await newProduct.save();
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

        let allProduct = await Product.find();
        return res.status(200).json({
            success : true,
            allProduct
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

        let {catID} = req.params;
        let ProductDetails= await Product.findById(catID);
        return res.status(200).json({
            success : true,
            ProductDetails
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}



module.exports.updateProd = async (req,res)=>{
    try{

        let {ProductID} = req.params;
        let prodUpdated = await Product.findByIdAndUpdate(ProductID, {
            $set :{
            title : req.body.title,
            description : req.body.description,
            image_Product : req.body.image_Product,
            price : req.body.price,
            categorie : req.body.categorie
            }
        },{
            new :true
        });
        return res.status(200).json({
            success : true,
            prodUpdated
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}

module.exports.deleteProd = async (req,res)=>{
    try{

        let {ProductID} = req.body;
        await Product.findByIdAndDelete(ProductID);
        return res.status(200).json({
            success : true,
            message : "Product Deleted"
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message: err.message
        })
    }
}

