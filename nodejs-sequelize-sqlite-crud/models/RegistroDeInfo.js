const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const RegistroDeInfo = sequelize.define('RegistroDeInfo', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'registros_de_info',
  timestamps: true,
});

RegistroDeInfo.associate = (models) => {
  RegistroDeInfo.belongsTo(models.Processo, {
    foreignKey: 'processo_id',
    as: 'processo',
  });
};

module.exports = RegistroDeInfo;
