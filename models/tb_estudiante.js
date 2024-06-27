module.exports = (sequelize, DataTypes) => {
    const Estudiante = sequelize.define('tb_estudiante', {
      estudiante_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      telefono: {
        type: DataTypes.CHAR(10),
        allowNull: false
      },
      fecharegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      /*fechacreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }*/
    }, {
      tableName: 'tb_estudiante',
      timestamps: false
    });
  
    return Estudiante;
  };
  