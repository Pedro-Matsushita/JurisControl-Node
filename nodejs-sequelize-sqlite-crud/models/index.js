const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', 
  storage: './database.sqlite', 
});

const Advogado = require('./Advogado')(sequelize);
const Cliente = require('./Cliente')(sequelize);
const Processo = require('./Processo')(sequelize);
const Audiencia = require('./Audiencia')(sequelize);
const RegistroDeInfo = require('./RegistroDeInfo')(sequelize);
const Administrador = require('./Administrador')(sequelize);
const Escritorio = require('./Escritorio')(sequelize);

Cliente.hasMany(Processo, { foreignKey: 'clienteAutorId', as: 'processosComoAutor' });
Cliente.hasMany(Processo, { foreignKey: 'clienteReuId', as: 'processosComoReu' });

Processo.belongsTo(Advogado, { foreignKey: 'advogadoAutorId', as: 'advogadoAutor' });
Processo.belongsTo(Advogado, { foreignKey: 'advogadoReuId', as: 'advogadoReu' });

Audiencia.belongsTo(Processo, { foreignKey: 'processoId', as: 'processo' });
Processo.hasMany(Audiencia, { foreignKey: 'processoId', as: 'audiencias' });

Administrador.belongsTo(Escritorio, {
  foreignKey: 'escritorio_id',
  as: 'escritorio',
});

Advogado.belongsTo(Escritorio, {
  foreignKey: 'escritorio_id',
  as: 'escritorio',
});

sequelize.sync()
  .then(() => console.log('Database synced successfully.'))
  .catch(err => console.error('Error syncing database:', err));

module.exports = {
  sequelize,
  Advogado,
  Cliente,
  Processo,
  Audiencia,
  RegistroDeInfo,
  Administrador,
  Escritorio,
};
