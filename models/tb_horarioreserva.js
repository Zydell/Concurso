module.exports = (sequelize, DataTypes) => {
    const Horarioreserva = sequelize.define('tb_horarioreserva', {
      horarioreserva_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      reservalab_id: DataTypes.INTEGER,
      fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      fecha_inicio: {
        type: DataTypes.TIME,
        allowNull: false
      },
      fecha_fin: {
        type: DataTypes.TIME,
        allowNull: false
      }
    }, {
      tableName: 'tb_horarioreserva',
      timestamps: false
    });
  
    return Horarioreserva;
  };
  