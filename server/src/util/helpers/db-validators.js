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

module.exports = {
    thereIsEmail
}