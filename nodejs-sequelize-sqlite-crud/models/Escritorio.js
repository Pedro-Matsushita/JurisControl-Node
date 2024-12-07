const { DataTypes } = require('sequelize');
const sequelize = require('./index');

module.exports = (sequelize) => {
const Escritorio = sequelize.define('Escritorio', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'escritorios',
  timestamps: true, 
});

Escritorio.associate = (models) => {
  Escritorio.hasMany(models.Advogado, {
    foreignKey: 'escritorioId',
    as: 'advogados',
  });

  Escritorio.hasMany(models.Administrador, {
    foreignKey: 'escritorioId',
    as: 'administradores',
  });
};
return Escritorio;
}