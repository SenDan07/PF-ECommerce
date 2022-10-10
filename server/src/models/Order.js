const { DataTypes }=require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define('order',{
        direccion: {
			type: DataTypes.TEXT,
			allowNull: false
		},
        telefono:{
            type: DataTypes.STRING,
			allowNull: false
        },
        pais:{
            type: DataTypes.STRING,
			allowNull: false
        },
		total: {
			type: DataTypes.FLOAT,
		}
	 },{
        timestamps:false,
    });
} 