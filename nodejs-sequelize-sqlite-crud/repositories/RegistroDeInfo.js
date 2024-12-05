const { RegistroDeInfo } = require('../models');

const RegistroDeInfoRepository = {
  /**
   * Busca registros de informação por processo ID.
   * @param {number} processoId
   * @returns {Promise<RegistroDeInfo[]>}
   */
  findByProcessoId: async (processoId) => {
    return await RegistroDeInfo.findAll({
      where: { processoId }
    });
  },

  /**
   * Cria um novo registro de informação.
   * @param {object} data
   * @returns {Promise<RegistroDeInfo>}
   */
  create: async (data) => {
    return await RegistroDeInfo.create(data);
  },

  /**
   * Atualiza um registro de informação pelo ID.
   * @param {number} id
   * @param {object} updates
   * @returns {Promise<[number, RegistroDeInfo[]]>}
   */
  update: async (id, updates) => {
    return await RegistroDeInfo.update(updates, { where: { id } });
  },

  /**
   * Remove um registro de informação pelo ID.
   * @param {number} id
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await RegistroDeInfo.destroy({ where: { id } });
  }
};

module.exports = RegistroDeInfoRepository;
