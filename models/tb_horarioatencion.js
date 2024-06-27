module.exports = (sequelize, DataTypes) => {
    const Horarioaatencion = sequelize.define('tb_horarioatencion', {
      horarioaten_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      horainicio: {
        type: DataTypes.TIME,
        allowNull: false
      },
      horafin: {
        type: DataTypes.TIME,
        allowNull: false
      },
    }, {
      tableName: 'tb_horarioatencion',
      timestamps: false
    });

    return Horarioaatencion;
  };
  