// repositories/AdvogadoRepository.js
const { Advogado } = require('../models');

class AdvogadoRepository {
  
  // Retorna todos os advogados de um escritório específico
  async findByEscritorioId(escritorioId) {
    return await Advogado.findAll({
      where: { escritorioId },
    });
  }

  // Retorna um advogado pelo email (Optional equivalente)
  async findByEmail(email) {
    return await Advogado.findOne({
      where: { email },
    });
  }

  // Outras operações básicas (opcional)
  async findById(id) {
    return await Advogado.findByPk(id);
  }

  async create(data) {
    return await Advogado.create(data);
  }

  async update(id, data) {
    const advogado = await this.findById(id);
    if (advogado) {
      return await advogado.update(data);
    }
    return null;
  }

  async delete(id) {
    const advogado = await this.findById(id);
    if (advogado) {
      return await advogado.destroy();
    }
    return null;
  }
}

module.exports = new AdvogadoRepository();
