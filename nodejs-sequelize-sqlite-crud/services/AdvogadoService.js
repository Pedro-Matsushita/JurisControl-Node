const { Advogado } = require('../models');
const { Processo } = require('../models');
const { AdvogadoNotFoundException } = require('../exceptions');

class AdvogadoService {

  async criarAdvogado(nome, registroOAB, senha) {
    const advogado = await Advogado.create({
      nome: nome,
      registroOAB: registroOAB,
      senha: senha,
    });
    return advogado;
  }

  async atualizarAdvogado(id, nome, registroOAB, senha) {
    const advogado = await Advogado.findByPk(id);
    if (!advogado) {
      throw new AdvogadoNotFoundException('Advogado não encontrado.');
    }

    advogado.nome = nome;
    advogado.registroOAB = registroOAB;
    advogado.senha = senha;

    await advogado.save();
    return advogado;
  }

  async buscarPorIdAdvogado(id) {
    const advogado = await Advogado.findByPk(id, {
      include: [
        { model: Processo, as: 'processosComoAutor', attributes: ['numeroProcesso', 'descricao'] },
        { model: Processo, as: 'processosComoReu', attributes: ['numeroProcesso', 'descricao'] },
      ],
    });

    if (!advogado) {
      throw new AdvogadoNotFoundException('Advogado não encontrado.');
    }

    return {
      id: advogado.id,
      nome: advogado.nome,
      registroOAB: advogado.registroOAB,
      senha: advogado.senha,
      processosComoAutor: advogado.processosComoAutor,
      processosComoReu: advogado.processosComoReu,
    };
  }

  async buscarTodosAdvogados() {
    const advogados = await Advogado.findAll({
      include: [
        { model: Processo, as: 'processosComoAutor', attributes: ['numeroProcesso', 'descricao'] },
        { model: Processo, as: 'processosComoReu', attributes: ['numeroProcesso', 'descricao'] },
      ],
    });

    return advogados.map(advogado => ({
      id: advogado.id,
      nome: advogado.nome,
      registroOAB: advogado.registroOAB,
      senha: advogado.senha,
      processosComoAutor: advogado.processosComoAutor,
      processosComoReu: advogado.processosComoReu,
    }));
  }

  async deletarAdvogado(id) {
    const advogado = await Advogado.findByPk(id);
    if (!advogado) {
      throw new AdvogadoNotFoundException('Advogado não encontrado.');
    }

    await advogado.destroy();
  }
}

module.exports = new AdvogadoService();
