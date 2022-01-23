const { Schema, model } = require("mongoose");

//modelo users
const UserSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
});


//exporto el schema pasandolo por model de mongoose
module.exports = model('User', UserSchema);