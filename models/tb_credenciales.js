module.exports = (sequelize, DataTypes) => {
    const Credenciales = sequelize.define('tb_credenciales', {
      credencial_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      correo_electronico: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipousuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      usuario_id: DataTypes.INTEGER,
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fechacreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'tb_credenciales',
      timestamps: false
    });
    
    Credenciales.associate = function(models) {
      Credenciales.belongsTo(models.tb_estudiante, { foreignKey: 'usuario_id', as: 'estudiante', constraints: false  });
      Credenciales.belongsTo(models.tb_profesor, { foreignKey: 'usuario_id', as: 'profesor', constraints: false  });
      Credenciales.belongsTo(models.tb_personaladmin, { foreignKey: 'usuario_id', as: 'admin', constraints: false  });
    };
  
    return Credenciales;
  };
  