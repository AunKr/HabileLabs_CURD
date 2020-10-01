const jwt = require('jsonwebtoken');

const secret = require('../config/auth.config');

/* This middleware will verify the token */
module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  /* Get the token in the form as `Bearer ${token}` */
        jwt.verify(token, secret);
        next();
    } catch(error) {
        res.status(401).json({
            meassage: 'You are unauthorized!!',
            type: 'error'
        });
    }
}

