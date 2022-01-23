const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidation = (req, res = response, next) =>{
    
    const token = req.header('z-token');

    if( !token ){
        return res.status(401).json({
            status: false,
            msg: 'Error with token.'

        });
    }

    try {

        const {uid, name} =  jwt.verify(token, process.env.PRIVATE_KEY);
        req.uid = uid,
        req.name = name
        
    } catch (err) {
        return res.status(401).json({
            satus: false,
            msg: 'Invalid token.'
        })
    }
    
    next();
}

module.exports = {
    jwtValidation
}