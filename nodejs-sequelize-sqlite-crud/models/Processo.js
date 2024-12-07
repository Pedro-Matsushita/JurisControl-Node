const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Processo = sequelize.define('Processo', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroProcesso: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'processos',
    timestamps: true, // Inclui colunas 'createdAt' e 'updatedAt'
  });

  // Função para configurar associações
  Processo.associate = (models) => {
    // ManyToOne com Cliente (autor)
    Processo.belongsTo(models.Cliente, {
      foreignKey: 'clienteAutorId', // Alterado para consistência com camelCase
      as: 'clienteAutor',
    });

    // ManyToOne com Cliente (réu)
    Processo.belongsTo(models.Cliente, {
      foreignKey: 'clienteReuId', // Alterado para consistência com camelCase
      as: 'clienteReu',
    });

    // ManyToOne com Advogado (autor)
    Processo.belongsTo(models.Advogado, {
      foreignKey: 'advogadoAutorId', // Alterado para consistência com camelCase
      as: 'advogadoAutor',
    });

    // ManyToOne com Advogado (réu)
    Processo.belongsTo(models.Advogado, {
      foreignKey: 'advogadoReuId', // Alterado para consistência com camelCase
      as: 'advogadoReu',
    });

    // OneToMany com Audiencia
    Processo.hasMany(models.Audiencia, {
      foreignKey: 'processoId', // Alterado para consistência com camelCase
      as: 'audiencias',
    });
  };

  return Processo;
};
