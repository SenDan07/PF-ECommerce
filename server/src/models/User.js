const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      isGoogle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "USER"),
        allowNull: false,
        defaultValue: "USER",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,  
        allowNull: true,
        defaultValue:
          "https://res.cloudinary.com/dzcpdipdg/image/upload/v1665265607/samples/icons/img-perfil-default_krpmpp.jpg",
      },
      secretWord:{
         type:DataTypes.TEXT,
         allowNull:false,

       }
    },

    {
      timestamps: false,
    }
  );
};
