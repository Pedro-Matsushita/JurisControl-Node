const { Escritorio } = require('../models');

const EscritorioRepository = {
  /**
   * Busca um escritório pelo ID.
   * @param {number} id 
   * @returns {Promise<Escritorio | null>}
   */
  findById: async (id) => {
    return await Escritorio.findByPk(id);
  },

  /**
   * Cria um novo escritório.
   * @param {object} data 
   * @returns {Promise<Escritorio>}
   */
  create: async (data) => {
    return await Escritorio.create(data);
  },

  /**
   * Atualiza um escritório pelo ID.
   * @param {number} id 
   * @param {object} updates 
   * @returns {Promise<[number, Escritorio[]]>}
   */
  update: async (id, updates) => {
    return await Escritorio.update(updates, { where: { id } });
  },

  /**
   * Remove um escritório pelo ID.
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await Escritorio.destroy({ where: { id } });
  }
};

module.exports = EscritorioRepository;
