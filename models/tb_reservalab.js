module.exports = (sequelize, DataTypes) => {
    const Reservalab = sequelize.define('tb_reservalab', {
      reservalab_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      laboratorio_id: DataTypes.INTEGER,
      credencial_id: DataTypes.INTEGER,
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipousuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'tb_reservalab',
      timestamps: false
    });
    
    Reservalab.associate = function(models) {
      Reservalab.belongsTo(models.tb_laboratorio, { foreignKey: 'laboratorio_id' });
      Reservalab.belongsTo(models.tb_credencial, { foreignKey: 'credencial_id' });
    };
  
    return Reservalab;
  };
  