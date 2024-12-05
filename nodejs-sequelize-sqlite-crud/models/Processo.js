const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Processo = sequelize.define('Processo', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  numeroProcesso: {
    type: DataTypes.STRING,
    allowNull: false,
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
  timestamps: true,
});

Processo.associate = (models) => {
  //ManyToOne com Cliente
  Processo.belongsTo(models.Cliente, {
    foreignKey: 'cliente_autor_id',
    as: 'clienteAutor',
  });

  Processo.belongsTo(models.Cliente, {
    foreignKey: 'cliente_reu_id',
    as: 'clienteReu',
  });

  Processo.belongsTo(models.Advogado, {
    foreignKey: 'advogado_autor_id',
    as: 'advogadoAutor',
  });

  Processo.belongsTo(models.Advogado, {
    foreignKey: 'advogado_reu_id',
    as: 'advogadoReu',
  });

  //OneToMany com Audiencia
  Processo.hasMany(models.Audiencia, {
    foreignKey: 'processo_id',
    as: 'audiencias',
  });

  Processo.hasMany(models.RegistroDeInfo, {
    foreignKey: 'processo_id',
    as: 'registrosDeInfo',
  });

  Processo.hasMany(models.Documento, {
    foreignKey: 'processo_id',
    as: 'documentos',
  });
};

module.exports = Processo;
