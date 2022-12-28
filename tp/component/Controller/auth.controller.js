const { db } = require('../Model/product.model');
const User = require('../Model/user.model') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Userr = require('../Controller/user.controller')




// /* register api */
// module.exports.registre = (req, res) => {
//     try {
//         let{username , password} = req.body ;
        
//       if (username && password) {
        
  
//         User.find({ username: username }, (err, data) => {
  
//           if (data.length == 0) {
  
//            // User.create(username,password) ;
//             Userr.createUser(username,password)
//             res.status(200).json({
//                 title :"Registered Successfully."
//             })
  
//           } else {
//             res.status(400).json({
//               errorMessage: `UserName ${req.body.username} Already Exist!`,
//               status: false
//             });
//           }
  
//         });
  
//       } else {
//         res.status(400).json({
//           errorMessage: 'Add proper parameter first!',
//           status: false
//         });
//       }
//     } catch (e) {
//       res.status(400).json({
//         errorMessage: 'Something went wrong!',
//         status: false
//       });
//     }
  
// };



// module.exports.loginn = (req, res) => {
//     try {
//       if (req.body && req.body.username && req.body.password) {
//         User.find({ username: req.body.username }, (err, data) => {
//           if (data.length > 0) {
  
//             if (bcrypt.compareSync(data[0].password, req.body.password)) {
//               checkUserAndGenerateToken(data[0], req, res);
//             } else {
  
//               res.status(400).json({
//                 errorMessage: 'Username or password is incorrect!',
//                 status: false
//               });
//             }
  
//           } else {
//             res.status(400).json({
//               errorMessage: 'Username or password is incorrect!',
//               status: false
//             });
//           }
//         })
//       } else {
//         res.status(400).json({
//           errorMessage: 'Add proper parameter first!',
//           status: false
//         });
//       }
//     } catch (e) {
//       res.status(400).json({
//         errorMessage: 'Something went wrong!',
//         status: false
//       });
//     }
  
// };




// function checkUserAndGenerateToken(data, req, res) {
//     jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
//       if (err) {
//         res.status(400).json({
//           status: false,
//           errorMessage: err,
//         });
//       } else {
//         res.json({
//           message: 'Login Successfully.',
//           token: token,
//           status: true
//         });
//       }
//     });
//   }