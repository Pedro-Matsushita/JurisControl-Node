const { Cliente } = require('../models');

const ClienteRepository = {
  /**
   * Busca um cliente pelo ID.
   * @param {number} id 
   * @returns {Promise<Cliente | null>}
   */
  findById: async (id) => {
    return await Cliente.findByPk(id);
  },

  /**
   * Busca um cliente pelo email.
   * @param {string} email 
   * @returns {Promise<Cliente | null>}
   */
  findByEmail: async (email) => {
    return await Cliente.findOne({ where: { email } });
  },

  /**
   * Cria um novo cliente.
   * @param {object} data 
   * @returns {Promise<Cliente>}
   */
  create: async (data) => {
    return await Cliente.create(data);
  },

  /**
   * Atualiza um cliente pelo ID.
   * @param {number} id 
   * @param {object} updates 
   * @returns {Promise<[number, Cliente[]]>}
   */
  update: async (id, updates) => {
    return await Cliente.update(updates, { where: { id } });
  },

  /**
   * Remove um cliente pelo ID.
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await Cliente.destroy({ where: { id } });
  }
};

module.exports = ClienteRepository;
