const { Documento } = require('../models');

const DocumentoRepository = {
  /**
   * Busca um documento pelo ID.
   * @param {number} id 
   * @returns {Promise<Documento | null>}
   */
  findById: async (id) => {
    return await Documento.findByPk(id);
  },

  /**
   * Cria um novo documento.
   * @param {object} data 
   * @returns {Promise<Documento>}
   */
  create: async (data) => {
    return await Documento.create(data);
  },

  /**
   * Atualiza um documento pelo ID.
   * @param {number} id 
   * @param {object} updates 
   * @returns {Promise<[number, Documento[]]>}
   */
  update: async (id, updates) => {
    return await Documento.update(updates, { where: { id } });
  },

  /**
   * Remove um documento pelo ID.
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await Documento.destroy({ where: { id } });
  }
};

module.exports = DocumentoRepository;
