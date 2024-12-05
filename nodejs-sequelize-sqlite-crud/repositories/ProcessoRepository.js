const { Processo } = require('../models');

const ProcessoRepository = {
  /**
   * Busca processos onde o advogado é o autor.
   * @param {number} advogadoId
   * @returns {Promise<Processo[]>}
   */
  findByAdvogadoAutorId: async (advogadoId) => {
    return await Processo.findAll({
      where: { advogadoAutorId: advogadoId }
    });
  },

  /**
   * Busca processos onde o advogado é o réu.
   * @param {number} advogadoId
   * @returns {Promise<Processo[]>}
   */
  findByAdvogadoReuId: async (advogadoId) => {
    return await Processo.findAll({
      where: { advogadoReuId: advogadoId }
    });
  },

  /**
   * Busca um processo pelo ID.
   * @param {number} id
   * @returns {Promise<Processo | null>}
   */
  findById: async (id) => {
    return await Processo.findByPk(id);
  },

  /**
   * Cria um novo processo.
   * @param {object} data
   * @returns {Promise<Processo>}
   */
  create: async (data) => {
    return await Processo.create(data);
  },

  /**
   * Atualiza um processo pelo ID.
   * @param {number} id
   * @param {object} updates
   * @returns {Promise<[number, Processo[]]>}
   */
  update: async (id, updates) => {
    return await Processo.update(updates, { where: { id } });
  },

  /**
   * Remove um processo pelo ID.
   * @param {number} id
   * @returns {Promise<number>}
   */
  delete: async (id) => {
    return await Processo.destroy({ where: { id } });
  }
};

module.exports = ProcessoRepository;
