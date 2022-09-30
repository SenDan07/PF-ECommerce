const { DataTypes } = require('sequelize');
const Sequelize = require('Sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Books', {


        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        }, 
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },


        authors: {
           
            type: DataTypes.STRING,
            allowNull: false


        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false
        },
       


        ISBN: {
            type: DataTypes.INTEGER,
            allowNull: false


        },
       
        imageLinks: {
            type: DataTypes.STRING,
           
        },
        description: {
            type: DataTypes.TEXT,
           
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }



    }, {
        timestamps: false,

    });
};

