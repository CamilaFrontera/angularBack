const bcrypt = require('bcryptjs');
const {response} = require('express');
const User = require('../models/User');
const { generateJWT } = require('../utilities/JWT');

//funcion crear usuario(register)
const register = async (req, res = response) =>{
    
    const {name, lastname, username, email, password} = req.body;

    try{

    //verificamos que el username sea unico

        let userUsername = await User.findOne({username: username});
        if(userUsername){
            return res.status(400).json({
                status: false,
                msg:'This username is taken. Please try a different one.'
            });
        }

   
    //verificamos si el email ya existe
        let userEmail = await User.findOne({email: email});
        if(userEmail){
            return res.status(400).json({
                status: false,
                msg:'There is already an existing account with this email.'
            });
        }

     //creamos user con el modelo creado
     const databaseUser = new User(req.body);
        
       

        //hashear la contraseña
            const salt = bcrypt.genSaltSync(10);
            databaseUser.password = bcrypt.hashSync(password, salt);



    //generamos JWT
        const token = await generateJWT(databaseUser.id, name, lastname);

    //creamos user en database
        await databaseUser.save();

    //respuesta success
        return res.status(201).json({
            ok: true,
            uid: databaseUser.id,
            username,
            email,
            token
        })
    

    }catch(err){
        console.log(err);
        return res.json({
            status: false,
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