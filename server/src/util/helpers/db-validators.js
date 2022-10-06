const { User } = require("../../db");


const thereIsEmail = async(email ='') => {
    console.log(email)
    
    const user = await User.findOne({where: {email:email}});

    if(!user){
       return null
    }else{
        return user;
    }
}

const thereIsUserById = async( id='' ) => {
    console.log(id)
    const user = await User.findByPk(id);
    console.log({user:user})
    if( !user ){
        throw new Error(`The Id ${ id } it doesnt exists`)
    }
}

module.exports = {
    thereIsEmail,
    thereIsUserById
}