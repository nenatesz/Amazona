
const bcrypt = require('bcryptjs');
const data = require("../data.js");
const User = require("../models/userModel");
const express = require("express");
const expressAsyncHandler = require('express-async-handler');
const {generateToken, isAuth} = require('../util');



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
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send({
            name:  newUser.name,
            email: newUser.email,
            isAdmin: true,
            token: generateToken(newUser)
        }); 

    }catch (error){
        res.send({msg: error.message}); 
    }
    
})

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send({message: 'User Not Found' });
    }
})
);

userRouter.put('/profile', isAuth, expressAsyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    }
}))


module.exports = userRouter;