const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Processo = require('./Processo');  

const Audiencia = sequelize.define('Audiencia', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  dataHora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resultado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'audiencias',
  timestamps: false,  // Defina como true caso queira timestamps automáticos
});

// Relacionamento com o modelo Processo (ManyToOne)
Audiencia.belongsTo(Processo, {
  foreignKey: 'processo_id',
  targetKey: 'id',
  onDelete: 'CASCADE',  // Defina o comportamento desejado ao deletar um processo
});

module.exports = Audiencia;
