const jwt = require('jsonwebtoken');
const jwtConfig = require('../../../config/jwt-config');


const generateToken = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };

        jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
            notBefore: jwtConfig.notBefore,
            audience: jwtConfig.audience,
            issuer: jwtConfig.issuer,
            algorithm: jwtConfig.algorithm
        }, ( err , token ) => {
             if( err ) {
                console.log(err)
                reject ( 'No se genero token' )
             }

             resolve(token);
             
        })
    })
}

module.exports = {
    generateToken
}