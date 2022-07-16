import express from "express";
import cors from 'cors';
import data from "./data.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
/*import config from "./config.js";*/
import userRouter from "./routers/userRouter.js";


 mongoose.connect("mongodb://localhost:27017/infosysdb",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
 },(err)=>{
    if(!err)console.log("connected to Database");
    else console.log("Db.error");
 })
const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/users',userRouter);
app.get("/api/products", (req, res)=>{
    res.send(data.products);
});
app.get('/api/product/:id',(req,res)=>{
    const product=data.products.find((x)=>x._id ===req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:'Product Not Found!'});
    }
})
app.use((err,req,res,next)=>{
    const status=err.name&&err.name =='ValidationError'?400:500;
    res.status(status).send({message:err.message});
})
app.listen(5000, ()=>{
    console.log("server at http://localhost:5000");
});