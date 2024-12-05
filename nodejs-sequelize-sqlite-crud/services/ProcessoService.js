const { Processo, Advogado, Cliente, Audiencia, RegistroDeInfo } = require('../models');
const { ProcessoNotFoundException, AdvogadoNotFoundException, ClienteNotFoundException } = require('../exceptions');

class ProcessoService {

  // Criar um novo processo
  async criarProcesso(numeroProcesso, descricao, status, tipo, dataInicio, advogadoAutorId, advogadoReuId, clienteAutor, clienteReu) {
    // Buscar advogados
    const advogadoAutor = await Advogado.findByPk(advogadoAutorId);
    const advogadoReu = await Advogado.findByPk(advogadoReuId);

    if (!advogadoAutor || !advogadoReu) {
      throw new AdvogadoNotFoundException('Advogado não encontrado');
    }

    // Criar cliente autor se não existir
    let clienteAutorObj = await Cliente.findOne({ where: { cpf: clienteAutor.cpf } });
    if (!clienteAutorObj) {
      clienteAutorObj = await Cliente.create(clienteAutor);
    }

    // Criar cliente réu se não existir
    let clienteReuObj = await Cliente.findOne({ where: { cpf: clienteReu.cpf } });
    if (!clienteReuObj) {
      clienteReuObj = await Cliente.create(clienteReu);
    }

    // Criar o processo
    const processo = await Processo.create({
      numeroProcesso,
      descricao,
      status,
      tipo,
      dataInicio,
      advogadoAutorId: advogadoAutor.id,
      advogadoReuId: advogadoReu.id,
      clienteAutorId: clienteAutorObj.id,
      clienteReuId: clienteReuObj.id,
    });

    return processo;
  }

  // Atualizar um processo existente
  async atualizarProcesso(id, descricao, status, tipo) {
    const processo = await Processo.findByPk(id);

    if (!processo) {
      throw new ProcessoNotFoundException('Processo não encontrado.');
    }

    processo.descricao = descricao;
    processo.status = status;
    processo.tipo = tipo;

    await processo.save();
    return processo;
  }

  // Listar todos os processos
  async listarTodosProcessos() {
    const processos = await Processo.findAll({
      include: [
        { model: Advogado, as: 'advogadoAutor', attributes: ['id', 'nome', 'registroOAB'] },
        { model: Advogado, as: 'advogadoReu', attributes: ['id', 'nome', 'registroOAB'] },
        { model: Cliente, as: 'clienteAutor', attributes: ['id', 'nome', 'cpf', 'telefone', 'tipo', 'endereco'] },
        { model: Cliente, as: 'clienteReu', attributes: ['id', 'nome', 'cpf', 'telefone', 'tipo', 'endereco'] },
        { model: Audiencia, as: 'audiencias', attributes: ['id', 'dataHora', 'local'] },
        { model: RegistroDeInfo, as: 'registrosDeInfo', attributes: ['data', 'descricao'] },
      ]
    });

    return processos;
  }

  // Buscar um processo por ID
  async buscarProcessoPorId(id) {
    const processo = await Processo.findByPk(id, {
      include: [
        { model: Advogado, as: 'advogadoAutor', attributes: ['id', 'nome', 'registroOAB'] },
        { model: Advogado, as: 'advogadoReu', attributes: ['id', 'nome', 'registroOAB'] },
        { model: Cliente, as: 'clienteAutor', attributes: ['id', 'nome', 'cpf', 'telefone', 'tipo', 'endereco'] },
        { model: Cliente, as: 'clienteReu', attributes: ['id', 'nome', 'cpf', 'telefone', 'tipo', 'endereco'] },
        { model: Audiencia, as: 'audiencias', attributes: ['id', 'dataHora', 'local'] },
        { model: RegistroDeInfo, as: 'registrosDeInfo', attributes: ['data', 'descricao'] },
      ]
    });

    if (!processo) {
      throw new ProcessoNotFoundException('Processo não encontrado');
    }

    return processo;
  }

  // Deletar um processo
  async deletarProcesso(id) {
    const processo = await Processo.findByPk(id);

    if (!processo) {
      throw new ProcessoNotFoundException('Processo não encontrado.');
    }

    await processo.destroy();
  }
}

module.exports = new ProcessoService();
