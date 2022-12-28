const mongoose=require("mongoose")

const productSchema= new mongoose.Schema({
        title :{
            type : String ,
            required : true
        } ,
        description :{
            type : String ,
            required: true
        } ,
        image_Product : {
            type : String ,
            required : false 
        },
        price : {
            type : String ,
            required : true,
        },
        categorie :{
            type : mongoose.Schema.Types.ObjectId ,
            ref: "categorie",
            required:false
        }

})
module.exports = mongoose.model("product",productSchema)