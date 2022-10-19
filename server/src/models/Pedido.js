const { DataTypes } = require('sequelize');
const sequelize = require('Sequelize');

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('Pedido', {
			
        
		price: {
			type: DataTypes.TEXT,
			
		},
		
		title: { 
			type: DataTypes.TEXT,
			
		},
		quantity: {
			type: DataTypes.TEXT,
			
		},
		stock:{
			type:DataTypes.INTEGER
		},
		imageLinks: {
			type: DataTypes.TEXT,
		},
		email:{
			type: DataTypes.TEXT
		},
		
		
		
    }, {
        timestamps: false,

    });

};
