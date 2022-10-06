const jwtConfig = require("../../../config/jwt-config");
const jwt = require('jsonwebtoken');



const jwtValidator = ( req,res,next ) => {
   const token = req.header('x-token');
   console.log(token)
    if( !token ){
        return res.status(401).json({
            message:'Token inexistente'
        })
    }
    try {

        const { id,name } = jwt.verify(
            token,
            jwtConfig.secret
        );

        req.id= id;
        req.name= name;
       
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:'Token inválido'
        })
    }
   next();
}

module.exports ={
    jwtValidator
}
