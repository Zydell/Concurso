module.exports = (sequelize, DataTypes) => {
    const Reservaesp = sequelize.define('tb_reservaesp', {
      reservaesp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      reservalab_id: DataTypes.INTEGER,
      credencial_id: DataTypes.INTEGER,
      disponibilidad_id: DataTypes.INTEGER,
    }, {
      tableName: 'tb_reservaesp',
      timestamps: false
    });
    
    Reservaesp.associate = function(models) {
      Reservaesp.belongsTo(models.tb_laboratorio, { foreignKey: 'reservalab_id' });
      Reservaesp.belongsTo(models.tb_credencial, { foreignKey: 'credencial_id' });
      Reservaesp.belongsTo(models.tb_disponibilidad, { foreignKey: 'disponibilidad_id' });
    };
  
    return Reservalab;
  };
  