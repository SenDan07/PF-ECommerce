const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Books",
    {
      id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      authors: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ISBN: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      imageLinks: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      activado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
