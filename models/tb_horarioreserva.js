module.exports = (sequelize, DataTypes) => {
    const Horarioreserva = sequelize.define('tb_horarioreserva', {
      horarioreserva_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      reservalab_id: DataTypes.INTEGER,
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
      },
      hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
      }
    }, {
      tableName: 'tb_horarioreserva',
      timestamps: false
    });
  
    return Horarioreserva;
  };
  