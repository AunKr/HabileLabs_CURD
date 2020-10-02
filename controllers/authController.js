const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const secret = require('../config/auth.config');

/*This funtion will be called when user will register itself in our application */
exports.singUp = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne( {email: email} )
    .then(userData => {
        if(userData) {  /* if the email is found then user is already registered */
            res.json({
                message: 'Already registered with this email id!!',
                type:'error'
            })
        }else {
            bcrypt.hash(password, 12)
            .then((hashedPassword) => {
                const user = new User({    /* creating a new instance of User Schema and addiing the details of user for registeration */
                    username: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,s
                });
                user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Registeration Successful!!',
                        type: 'success'
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
}


/* This funtion will be called  user will click on the sign in button */
exports.singIn = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email})
    .then( user => {
        if(user.length > 0) {      /*  if user exists then compare the password */
            bcrypt.compare(password, user[0].password)
            .then( passwordIsValid => {
                if(passwordIsValid) {
                    const token = jwt.sign({  /* if password is valid then assign the token */
                        email: user.email
                    }, 
                    secret, 
                    {
                        expiresIn: 86400 // 24 hours
                    });
                    res.status(200).json({
                        meassage: 'Login Successful!!',
                        type: 'success',
                        token: token,
                    });
                }else {
                    res.status(401).json({
                        meassage: 'Please enter correct password!!',
                        type: 'error'
                    });
                }
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            res.status(401).json({
                message: 'Incorrect User Name!!',
                type: 'error'
            });
        }
    })
    .catch(err => {
        console.log(err);
    })
}