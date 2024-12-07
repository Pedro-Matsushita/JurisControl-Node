const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
    timestamps: false, // Alterar para true caso timestamps automáticos sejam necessários
  });

  // Função para configurar as associações
  Audiencia.associate = (models) => {
    // Relacionamento ManyToOne com Processo
    Audiencia.belongsTo(models.Processo, {
      foreignKey: 'processoId', // CamelCase para consistência
      as: 'processo',
      onDelete: 'CASCADE', // Define o comportamento ao deletar um Processo
    });
  };

  return Audiencia;
};
