const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Documento = sequelize.define('Documento', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoDocumento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tamanhoDoc: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  anexo: {
    type: DataTypes.BLOB('long'), 
    allowNull: true,
  },
}, {
  tableName: 'documentos',
  timestamps: true, 
});

Documento.associate = (models) => {
  Documento.belongsTo(models.Processo, {
    foreignKey: 'processos_id',
    as: 'processo',
  });
};

module.exports = Documento;
