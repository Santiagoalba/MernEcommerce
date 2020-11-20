authCtrl = {};
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

authCtrl.index = (req, res) => {
    res.status(200).json({
       message: 'Hello World'
    });
}

authCtrl.signUp = (req, res) => {

    const errors = validationResult(req);
    return res.status(400).json({errors: errors.array()});


    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body

        const _user = new User({ 
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
         });

         _user.save((error, data) => {
             if(error){
                 return res.status(400).json({
                     message: 'something went wrong'
                 })
             } 

             if(data) {
                 return res.status(201).json({
                     message: 'User created successfully'
                 })
             }
         })
    })
}

authCtrl.signIn = (req, res) => {
    User.findOne({email:req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({error})
        if(user){

            if(user.authenticate(req.body.password)){
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            } else {
                return res.status(400).json({
                    message: 'Invalid Password'
                });
            }
        
        } else {
            return res.status(400).json({
                message: 'User not found'
            })
        }
    })
}


module.exports = authCtrl;