const { User } = require("../../db");


const isRoleValid = async(role ='') => {
    console.log(role)
    const validRole = await User.findOne({
        where:{
            role:'ADMIN',
        }
    })

    if(! validRole){
       throw new Error(`El rol ${ role } no existe`)
    }
}

module.exports = {
    isRoleValid
}