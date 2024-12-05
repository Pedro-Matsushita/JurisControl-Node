const { Escritorio } = require('../models');
const { EscritorioNotFoundException } = require('../exceptions');

class EscritorioService {

  async criarEscritorio(nome, cnpj, telefone) {
    return await Escritorio.create({
      nome: nome,
      cnpj: cnpj,
      telefone: telefone,
    });
  }

  async atualizarEscritorio(id, nome, cnpj, telefone) {
    const escritorio = await Escritorio.findByPk(id);
    
    if (!escritorio) {
      throw new EscritorioNotFoundException('Escritório não encontrado.');
    }

    escritorio.nome = nome;
    escritorio.cnpj = cnpj;
    escritorio.telefone = telefone;

    await escritorio.save();
    return escritorio;
  }

  async buscarPorIdEscritorio(id) {
    const escritorio = await Escritorio.findByPk(id);

    if (!escritorio) {
      throw new EscritorioNotFoundException('Escritório não encontrado.');
    }

    return escritorio;
  }

  async buscarTodosEscritorios() {
    return await Escritorio.findAll();
  }

  async deletarEscritorio(id) {
    const escritorio = await Escritorio.findByPk(id);
    
    if (!escritorio) {
      throw new EscritorioNotFoundException('Escritório não encontrado.');
    }

    await escritorio.destroy();
  }
}

module.exports = new EscritorioService();
