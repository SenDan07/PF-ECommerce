const { DataTypes } = require('sequelize');
const Sequelize = require('Sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Categories', {


        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        imageLinks: {
            type: DataTypes.STRING,
        
        },

    }, {
        timestamps: false,

    });
};
