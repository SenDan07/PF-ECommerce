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
			type: DataTypes.TEXT,
			allowNull: false
		},
		authors: {	
			type: DataTypes.TEXT,
			allowNull: false
		},
		publisher: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		ISBN: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		imageLinks: {
			type: DataTypes.TEXT,
		},
		description: {
			type: DataTypes.TEXT,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		activado:{
			type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
		}
	}, 
	{
		timestamps: false,
	});
};