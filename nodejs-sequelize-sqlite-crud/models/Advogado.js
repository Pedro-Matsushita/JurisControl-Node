const { DataTypes } = require('sequelize');
const sequelize = require('./index');

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
  timestamps: true,  
});

// Associações
Advogado.associate = (models) => {
  // ManyToOne com Escritorio
  Advogado.belongsTo(models.Escritorio, {
    foreignKey: 'escritorio_id',
    as: 'escritorio',
  });

  // OneToMany com Processo como autor
  Advogado.hasMany(models.Processo, {
    foreignKey: 'advogado_autor_id',
    as: 'processosComoAutor',
  });

  // OneToMany com Processo como réu
  Advogado.hasMany(models.Processo, {
    foreignKey: 'advogado_reu_id',
    as: 'processosComoReu',
  });
};

module.exports = Advogado;
