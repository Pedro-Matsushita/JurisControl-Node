const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Administrador = sequelize.define('Administrador', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'administradores',
  timestamps: true, 
});

Administrador.associate = (models) => {
  Administrador.belongsTo(models.Escritorio, {
    foreignKey: 'escritorio_id',
    as: 'escritorio',
  });
};

module.exports = Administrador;
