const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const dataBaseConnection = async() => {
    try{                                                                        //se queda esperando conexion con db

        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            
        });

        //avisa
        console.log('Database connected.')

    }catch(err){                                                                //si no conecta
        console.log(err);
        process.exit(1);
       
    }
}

//exportamos
module.exports = {
    dataBaseConnection
}