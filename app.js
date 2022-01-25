//requerimos/Traemos todos los módulos que necesitamos
const express = require('express');
const cors = require('cors');
const { dataBaseConnection } = require('./database/config');
require('dotenv').config();



//inicializamos la variable app con express
const app = express();

//conexion a database
dataBaseConnection();


app.use(express.static('public'))

const whitelist = ['http://localhost:4200/'];

//MIDDLEWARES////////////////////////////////////////////////////
//parseo
app.use(express.json());
//rutas
app.use('/users', require('./routes/authentication'));
//aplicamos cors para acceder desde cualquier dominio
app.use(cors({origin: whitelist}));


///////////////////////////////////////////////////////////////////////


//para que no tire cannot GET
app.get('/', (req,res) =>{
    res.send('Endpoint inválido.');
});

//le decimos que escuche al puerto elegido
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo el el puerto ${process.env.PORT} \n \n http://localhost:3000`);
})
