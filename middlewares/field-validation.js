const { response } = require("express");
const {validationResult}  = require('express-validator');

//constante-funcion validar campos
const fieldValidation = (req, res = response,next) =>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

    next();             //funcion para que si esta todo ok prosiga con el siguiente middleware
}

//exportamos validar campos
module.exports = {
    fieldValidation
}