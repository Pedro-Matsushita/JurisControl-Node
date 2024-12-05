const { Audiencia } = require('../models');

const AudienciaRepository = {
  /**
   * Busca uma audiência pelo ID.
   * @param {number} id 
   * @returns {Promise<Audiencia | null>}
   */
  findById: async (id) => {
    return await Audiencia.findByPk(id);
  },

  /**
   * Busca audiências pelo ID de um processo.
   * @param {number} processoId 
   * @returns {Promise<Audiencia[]>}
   */
  findByProcessoId: async (processoId) => {
    return await Audiencia.findAll({ where: { processoId } });
  },

  /**
   * Cria uma nova audiência.
   * @param {object} data 
   * @returns {Promise<Audiencia>}
   */
  create: async (data) => {
    return await Audiencia.create(data);
  },

  /**
   * Atualiza uma audiência pelo ID.
   * @param {number} id 
   * @param {object} updates 
   * @returns {Promise<[number, Audiencia[]]>}
   */
  update: async (id, updates) => {
    return await Audiencia.update(updates, { where: { id } });
  },

  /**
   * Remove uma audiência pelo ID.
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await Audiencia.destroy({ where: { id } });
  }
};

module.exports = AudienciaRepository;
