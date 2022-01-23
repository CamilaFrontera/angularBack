const jwt = require ('jsonwebtoken');

const generateJWT = (uid, name, lastname) => {

    const payload = {uid, name, lastname};

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '72h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}