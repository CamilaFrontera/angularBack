const {response} = require('express');
const User = require('../models/User');

//funcion crear usuario(register)
const register = async (req, res = response) =>{
    
    const {name, lastname, username, email, password} = req.body;

    try{

    //verificamos que el username sea unico

        let user = await User.findOne({username: username});
        if(user){
            return res.status(400).json({
                status: false,
                msg:'This username is taken. Please try a different one.'
            });
        }

    //creamos user con el modelo creado
        const databaseUser = new User(req.body);
    //verificamos si el email ya existe
       

    //hashear la contraseña

    //generamos JWT

    //creamos user en database
        await databaseUser.save();

    //respuesta success
        return res.status(201).json({
            status: true,
            uid: databaseUser.id,
            username: databaseUser.username,
            email: databaseUser.email
        })
    

    }catch(err){
        
    return res.json({
        status: ok,
        msg: "There's been a problem with the register."
    })
    }
    
}


//funcion acceder(login)
const login = (req, res = response) =>{
    
    const {email, password} = req.body;
    
    return res.json({
        status: true,
        msg: 'Login de usuario'
    })
}

//funcion validar(validation)
const authenticate = (req, res = response) =>{
    return res.json({
        status: true,
        msg: 'Renovar.'
    })
}

//exports
module.exports = {
    register: register,
    login: login,
    authenticate: authenticate
}