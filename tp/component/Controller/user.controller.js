const User = require("../Model/user.model") ;
const Product = require("../Controller/product.controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser")
const SECRET_JWT_CODE = '90963e619029b5252b37d9139f87b9a52717fa7328b7cf00e650c6868e69ec4cf9ba38d6dabfd7204306d06fb5220ec517bf02b6f2bf7f382d02100fc6e27e46'



module.exports.createUser = async(req,res)=>{
    try{
        let {
            username ,
            password ,
            isAdmin,
            wishlist
        } = req.body 
        let newUser = new User ({
            username : username ,
            password : password ,
            isAdmin : isAdmin ,
            wishlist : wishlist 
        }) ;
        let savedUser = await newUser.save() ;
        const newUs = await User.create()
        return res.status(200).json({
            success : true ,
            savedUser
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message : err.message 
        })
    }
}





module.exports.deleteUser = async (req,res)=>{
    try{
        let {userID}=req.params ;
        //console.log(userId)
        await User.findByIdAndDelete(userID);
        return res.status(200).json({
            success : true ,
            message :"User Deleted"
        })
    }catch(err){
        return res.status(400).json({
            success : false ,
            message : err.message
        })
    }
}




module.exports.showUser = async (req, res) => {
    try {
        let  {userID}  = req.params;
         let userDetail = await User.findById(userID)

        return res.status(200).json({
            success: true,
            user: userDetail
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}




module.exports.updateUser=async(req,res)=>{
    try{
        let {userID} =req.params ;
        let {
            username ,
            password ,
            isAdmin,
            wishlist
        } = req.body 
        let updatedUser = await User.findByIdAndUpdate(userID,{
            $set : {
                username : username ,
                password : password ,
                isAdmin : isAdmin ,
                wishlist : wishlist 
            }
        },
        {
            new : true 
        })
        return res.status(200).json({
            success : true ,
            updatedUser
        })

    }catch(err){
        return res.status(400).json({
            success:false ,
            message : err.message
        })
    }
}





module.exports.getAllUsers = async (req,res)=>{
    try{
        let users= await User.find();
        return res.status(200).json({
            success : true ,
            users
        })

    }catch(err){
        return res.status(400).json({
            success : false ,
            message:err.message ,
        })
    }
}






module.exports.addTowishList =async (req,res)=>{
    const { userID }    = req.params ;
    // const { ProductID } = req.body.wishlist;
  try{
    const user = await User.findById(userID);
    if(user.isAdmin.toString()===("true")){
        res.status(405).json({
            success : false ,
            message : "sorry you can't "
        })
    }else{
    var productId=  req.body.wishlist;
        console.log('prod :' , productId)
    const alreadyadded = user.wishlist.find((id) => id.toString() === productId);
    console.log(alreadyadded)
    
  if (alreadyadded) {
    // console.log("test 1: "+productId) ;
    // console.log("product is already added with ID"+ productId )
    return res.status.json({
        success : false ,
        message : "product is already added "+ productId ,
        user
    })
    } else {
   console.log("test 2: "+productId) ;
        let user = await User.findByIdAndUpdate(
        userID,
        
        {
            $push :{wishlist: productId}
        },
        {
            new: true,
        }
        );
        res.json(user);
  }
}
    }catch (err) {
        return res.json(err)
  }
}



// module.exports.deleteOneFromWishList = async (req,res)=>{
//     let {userID} = req.params ;
//     var productId=  req.body.wishlist;
//     let user = await User.findById(userID)  ;
//     user.wishlist.findByIdAndDelete((id) =>{id.toString()=== productId}) ;
    
//     res.json(user) ;

// }


// // Login a user
// const loginUserCtrl = async(async (req, res) => {
//     const { email, password } = req.body;
//     // check if user exists or not
//     const findUser = await User.findOne({ email });
//     if (findUser && (await findUser.isPasswordMatched(password))) {
//       const refreshToken = await generateRefreshToken(findUser?._id);
//       const updateuser = await User.findByIdAndUpdate(
//         findUser.id,
//         {
//           refreshToken: refreshToken,
//         },
//         { new: true }
//       );
//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: 72 * 60 * 60 * 1000,
//       });
//       res.json({
//         _id: findUser?._id,
//         username: findUser?.username,
//         password: findUser?.password,
        
//         token: generateToken(findUser?._id),
//       });
//     } else {
//       throw new Error("Invalid Credentials");
//     }
//   });
  


// module.exports.login10 = async(req,res)=>{
//     try{
//         let username,password = req.body ;
//         // let userName = req.body.username;
//         // let passwordS = req.body.password ;
//        const user = await User.findOne({username : username}) ;
//        console.log(username) ;
//         if (user) {
//            let submittedPass = password; 
//             let storedPass = user.password; 
//             const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
//             console.log(passwordMatch)
//             if (passwordMatch) {
//                 let usrname = user.username;
//                 res.status(200).json({
//                     success : true,
//                     usrname
//                 })
//             } else {
//                 res.send("login again");
//             }
//         }
//         else{
//             return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//         }
//         //console.log(user)
    

//     }catch(err){
//         res.status(400).json({
//             success : false ,
//             message3: err.message
//         })
//     }
// }

module.exports.login11 = async(req,res)=>{
    
        //let {username} = req.body;
        const user = await User.findOne({ username : req.body.username });
        //console.log(user);
            if (user === null) { 
                return res.status(400).send({ 
                    message : "User not found."
                }); 
            } 
            else { 
                let submittedPass = req.body.password; 
                //console.log(submittedPass)
                let storedPass = user.password; 
                //console.log(storedPass)
                const passwordMatch =  bcrypt.compare(submittedPass, storedPass);
                //console.log(passwordMatch)
                if (passwordMatch) {
                    //console.log("user")
                    token = jwt.sign({id:user._id,username:user.username,type:'user'},SECRET_JWT_CODE,{ expiresIn: '2h'})
                    //return {status:'ok',data:token}
                    // let usrname = user.username;
                    res.status(200).json({
                        success : true,
                        user ,
                        token 
                    })
                        // storing our JWT web token as a cookie in our browser
                        res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
                        //return token
                } else {
                    res.send("login again");
                }
            } 
        
    
}


// user login function
// const verifyUserLogin = async (username,password)=>{
//     try {
//         const user = await User.findOne({username})
//         if(!user){
//             return {status:'error',error:'user not found'}
//         }
//         else{ 
//             await bcrypt.compare(password,user.password)
//             // creating a JWT token
//             token = jwt.sign({id:user._id,username:user.username,type:'user'},SECRET_JWT_CODE,{ expiresIn: '2h'})
//             return {status:'ok',data:token}
//         }
//     } catch (error) {
//         console.log(error);
//         return {status:'error',error:'timed out'}
//     }
// }

// module.exports.login9 = async(req,res)=>{
//     try{
//         const {username,password}=req.body;
//         // we made a function to verify our user login
//         const response = await verifyUserLogin(username,password);
//         if(response.status==='ok'){
//             // storing our JWT web token as a cookie in our browser
//             res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
//             //res.redirect('/');
//         }else{
//             res.json(response);
//         }
        
        
//     } catch{
//         res.send("Internal server error");
//     }
// }