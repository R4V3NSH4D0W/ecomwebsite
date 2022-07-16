import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils';
const userRouter=express.Router();
userRouter.get("/createadmin",expressAsyncHandler (async(req,res)=>{
    try{
        const user=new User({
            name:'admin',
            email:'lenishmagar@gmail.com',
            password:'infosys',
            isAdmin:true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    }catch(err){
        res.status(500).send({message:err.message});
    }
}));

userRouter.post('/signin',expressAsyncHandler( async(req,res)=>{
    const {email, password} = req.body;
    const signinUser= await User.findOne({
        email: email,
    });
    if(password !== signinUser.password){
        res.status(401).send({
            message:"Invalid Email or passowrd",
        });
    }else{
        res.send({
            _id:signinUser._id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token:generateToken(signinUser),
        })
    }
}));
export default userRouter;
