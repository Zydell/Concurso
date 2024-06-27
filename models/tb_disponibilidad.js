module.exports = (sequelize, DataTypes) => {
    const Disponibildad = sequelize.define('tb_disponibilidad', {
      disponibilidad_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      laboratorio_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      capacidaddisp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      equiposdisp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      tableName: 'tb_disponibilidad',
      timestamps: false
    });

    Disponibildad.associate = function(models) {
      Disponibildad.belongsTo(models.tb_laboratorio, { foreignKey: 'laboratorio_id' });
    };
  
    return Disponibildad;
  };
  