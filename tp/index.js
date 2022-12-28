const express =require("express") ;
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config();
const userRoutes = require("./component/Route/user.route")
const productRoutes = require("./component/Route/product.route")
const categoryRoutes = require("./component/Route/categorie.route")
const authRoutes = require("./component/Route/auth.route")
const cors = require('cors')
var cookieParser = require('cookie-parser');

const app = express() ;

app.use(cors());
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended : true})) ;
app.use(cookieParser());
mongoose.connect(process.env.DB_CONNECT);
mongoose.connection.on("connected",()=>{
    console.log("connected successfully")
})
mongoose.connection.on("error",(err)=>{
    console.log("connection failed" + err) ;
})

app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
//app.use("/api/auth", authRoutes);
app.listen(process.env.App_PORT ,()=>{
    console.log(`serveur listning on port ${process.env.APP_PORT}`) ;
})