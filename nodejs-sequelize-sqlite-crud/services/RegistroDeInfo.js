const { RegistroDeInfo, Processo } = require('../models');
const { RegistroDeInfoNotFoundException, ProcessoNotFoundException } = require('../exceptions');

class RegistroDeInfoService {

  // Criar um novo registro de informação
  async criarRegistroDeInfo(processoId, data, descricao) {
    // Verificar se o processo existe
    const processo = await Processo.findByPk(processoId);

    if (!processo) {
      throw new ProcessoNotFoundException('Processo não encontrado');
    }

    // Verificar se os dados necessários estão presentes
    if (!data || !descricao) {
      throw new Error('Dados incompletos. A data e a descrição são obrigatórios.');
    }

    // Criar o registro de informação
    const registroDeInfo = await RegistroDeInfo.create({
      processoId: processo.id,
      data,
      descricao
    });

    return registroDeInfo;
  }

  // Buscar todos os registros de informação
  async buscarTodosRegistrosDeInfo() {
    const registros = await RegistroDeInfo.findAll({
      include: [
        {
          model: Processo,
          attributes: ['id', 'numeroProcesso']
        }
      ]
    });

    return registros.map(registro => ({
      id: registro.id,
      processoId: registro.processoId,
      numeroProcesso: registro.Processo.numeroProcesso,
      data: registro.data,
      descricao: registro.descricao
    }));
  }

  // Buscar um registro de informação por ID
  async buscarRegistroDeInfoPorId(id) {
    const registroDeInfo = await RegistroDeInfo.findByPk(id, {
      include: [
        {
          model: Processo,
          attributes: ['id', 'numeroProcesso']
        }
      ]
    });

    if (!registroDeInfo) {
      throw new RegistroDeInfoNotFoundException('Registro de informação não encontrado.');
    }

    return {
      id: registroDeInfo.id, 
      processoId: registroDeInfo.processoId,
      numeroProcesso: registroDeInfo.Processo.numeroProcesso,
      data: registroDeInfo.data,
      descricao: registroDeInfo.descricao
    };
  }

  // Deletar um registro de informação
  async deletarRegistroDeInfo(id) {
    const registroDeInfo = await RegistroDeInfo.findByPk(id);

    if (!registroDeInfo) {
      throw new RegistroDeInfoNotFoundException('Registro de Informação não encontrado');
    }

    await registroDeInfo.destroy();
  }
}

module.exports = new RegistroDeInfoService();
