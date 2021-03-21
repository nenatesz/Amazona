import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import data from "../data.js";
import User from "../models/userModel"
import { generateToken } from "../util";



const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    // await User.remove({})
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}))

userRouter.post("/signin", async (req, res) => {
    
    // findone is a filter
    const signinUser = await User.findOne({
        email: req.body.email,
    })
    if(signinUser){
        // if user exisits, we send back the details of the user
        // token checks if a user is authenticated or not
        if(bcrypt.compareSync(req.body.password, signinUser.password)){
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,        
                isAdmin: signinUser.isAdmin,
                token: generateToken(signinUser)
            })
        }
    }else{
        res.status(401).send({msg: 'invalid Email or Password'})
    }
} )

userRouter.post("/register", expressAsyncHandler(async (req, res) => {
     
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createdUser = await user.save()
    if(createdUser){
        // if user exisits, we send back the details of the user
        // token checks if a user is authenticated or not
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        })
    }else{
        res.status(401).send({msg: 'invalid User Data.'})
    }
})  )

userRouter.get("/createadmin", async (req, res) => {

    try {
        const user = new User({
            name:  'Tessy',
            email: 'tessyanyadike1@gmail.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser); 

    }catch (error){
        res.send({msg: error.message}); 
    }
    
})

export default userRouter;