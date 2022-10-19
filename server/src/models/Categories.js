const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Categories', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageLinks: {
            type: DataTypes.TEXT,
            
        },
        activado:{
			type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
		}

    }, {
        timestamps: false,

    });
};
