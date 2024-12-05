const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: 'sqlite', // Substitua por 'mysql' ou 'postgres' se necessário
  storage: './database.sqlite', // Ajuste o caminho conforme necessário
});

// Carrega os modelos, passando a instância do Sequelize
const Advogado = require('./Advogado')(sequelize);
const Cliente = require('./Cliente')(sequelize);
const Processo = require('./Processo')(sequelize);
const Escritorio = require('./Escritorio')(sequelize);
const Administrador = require('./Administrador')(sequelize);
const Documento = require('./Documento')(sequelize);
const RegistroDeInfo = require('./RegistroDeInfo')(sequelize);
const Audiencia = require('./Audiencia')(sequelize);

// Definindo as relações (ajuste conforme suas necessidades)
Advogado.belongsTo(Escritorio, { foreignKey: 'escritorioId', as: 'escritorio' });
Escritorio.hasMany(Advogado, { foreignKey: 'escritorioId', as: 'advogados' });

Cliente.hasMany(Processo, { foreignKey: 'clienteAutorId', as: 'processosComoAutor' });
Cliente.hasMany(Processo, { foreignKey: 'clienteReuId', as: 'processosComoReu' });

Processo.belongsTo(Advogado, { foreignKey: 'advogadoAutorId', as: 'advogadoAutor' });
Processo.belongsTo(Advogado, { foreignKey: 'advogadoReuId', as: 'advogadoReu' });

Processo.hasMany(Documento, { foreignKey: 'processoId', as: 'documentos' });
Documento.belongsTo(Processo, { foreignKey: 'processoId', as: 'processo' });

Processo.hasMany(RegistroDeInfo, { foreignKey: 'processoId', as: 'registrosDeInfo' });
RegistroDeInfo.belongsTo(Processo, { foreignKey: 'processoId', as: 'processo' });

// Definindo a associação de Audiencia com Processo
Audiencia.belongsTo(Processo, { foreignKey: 'processoId', as: 'processo' });
Processo.hasMany(Audiencia, { foreignKey: 'processoId', as: 'audiencias' });

// Sincroniza o banco de dados
sequelize.sync()
  .then(() => console.log('Database synced successfully.'))
  .catch(err => console.error('Error syncing database:', err));

// Exporta a conexão e os modelos
module.exports = {
  sequelize,
  Advogado,
  Cliente,
  Processo,
  Escritorio,
  Administrador,
  Documento,
  RegistroDeInfo,
  Audiencia,
};
