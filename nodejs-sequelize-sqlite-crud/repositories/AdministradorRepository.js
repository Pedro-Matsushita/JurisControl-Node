const { Administrador } = require('../models');

const AdministradorRepository = {
  /**
   * Busca um administrador pelo ID.
   * @param {number} id 
   * @returns {Promise<Administrador | null>}
   */
  findById: async (id) => {
    return await Administrador.findByPk(id);
  },

  /**
   * Busca um administrador pelo email.
   * @param {string} email 
   * @returns {Promise<Administrador | null>}
   */
  findByEmail: async (email) => {
    return await Administrador.findOne({ where: { email } });
  },

  /**
   * Cria um novo administrador.
   * @param {object} data 
   * @returns {Promise<Administrador>}
   */
  create: async (data) => {
    return await Administrador.create(data);
  },

  /**
   * Atualiza um administrador pelo ID.
   * @param {number} id 
   * @param {object} updates 
   * @returns {Promise<[number, Administrador[]]>}
   */
  update: async (id, updates) => {
    return await Administrador.update(updates, { where: { id } });
  },

  /**
   * Remove um administrador pelo ID.
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await Administrador.destroy({ where: { id } });
  }
};

module.exports = AdministradorRepository;
