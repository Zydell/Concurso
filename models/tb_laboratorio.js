module.exports = (sequelize, DataTypes) => {
    const Laboratorio = sequelize.define('tb_laboratorio', {
      laboratorio_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      horarioaten_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cantequipos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
          },
      },
      fechacreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'tb_laboratorio',
      timestamps: false
    });

    Laboratorio.associate = function(models) {
        Laboratorio.belongsTo(models.tb_horarioatencion, { foreignKey: 'horarioaten_id' });
    };
  
    return Laboratorio;
  };
  