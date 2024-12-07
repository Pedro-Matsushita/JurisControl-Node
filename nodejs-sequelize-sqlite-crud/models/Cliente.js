const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{11}$/, // Apenas números com 11 dígitos
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'clientes',
    timestamps: true, // Inclui colunas 'createdAt' e 'updatedAt'
  });

  // Função para configurar associações
  Cliente.associate = (models) => {
    // Relacionamento OneToMany com Processo (Cliente como autor)
    Cliente.hasMany(models.Processo, {
      foreignKey: 'clienteAutorId', // Consistência com camelCase
      as: 'processosComoAutor',
    });

    // Relacionamento OneToMany com Processo (Cliente como réu)
    Cliente.hasMany(models.Processo, {
      foreignKey: 'clienteReuId', // Consistência com camelCase
      as: 'processosComoReu',
    });
  };

  return Cliente;
};
