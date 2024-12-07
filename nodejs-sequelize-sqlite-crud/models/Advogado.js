const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Advogado = sequelize.define('Advogado', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registroOAB: {
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
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'advogados',
    timestamps: true, // Cria colunas 'createdAt' e 'updatedAt'
  });

  // Função para configurar as associações
  Advogado.associate = (models) => {
    // ManyToOne com Escritorio
    Advogado.belongsTo(models.Escritorio, {
      foreignKey: 'escritorioId', 
      as: 'escritorio',
    });

    // OneToMany com Processo como autor
    Advogado.hasMany(models.Processo, {
      foreignKey: 'advogadoAutorId', 
      as: 'processosComoAutor',
    });

    // OneToMany com Processo como réu
    Advogado.hasMany(models.Processo, {
      foreignKey: 'advogadoReuId',
      as: 'processosComoReu',
    });
  };

  return Advogado;
};
