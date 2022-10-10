const { DataTypes }=require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define('detalle',{
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true,
            },
        orderId: {
            type: DataTypes.INTEGER,
            references: {
              model:'Order', 
              key: 'id'
            }
          },
          BookId: {
            type: DataTypes.UUID,
            references: {
              model: 'Books', 
              key: 'id'
            }
          }
        },{
        timestamps:false,
    });
} 