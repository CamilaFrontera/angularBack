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
            status: true,
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
const  login = async (req, res = response) =>{
    
    const {username, password} = req.body;
    
    
    try{

        const dbUser = await User.findOne({username: username});
        
        if(!dbUser){
            return res.status(400).json({
                status: false,
                msg: "The typed username doesn't exist."
            })
        }

        const validPassword  = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return res.status(400).json({
                status: false,
                msg: "The typed password isn't valid."
            })
        }

        const token = await generateJWT(dbUser.id,  dbUser);

        return res.json({
            status: true,
            uid: dbUser.id,
            username,
            token
        });

    }catch(err){
        console.log(err);
        return res.json({
            status: false,
            msg: "We couldn't log you in. Please contact administrator."
        })
    }
}

//funcion validar(validation)
const authenticate = async (req, res = response) =>{

    const { uid, name } = req;

    const token = await generateJWT(name);

    return res.json({
        status: true,
        uid, name, token
        
    });
}

//exports
module.exports = {
    register: register,
    login: login,
    authenticate: authenticate
}