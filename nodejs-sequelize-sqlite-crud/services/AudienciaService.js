const { Audiencia, Processo } = require('../models');
const { AudienciaNotFoundException, ProcessoNotFoundException } = require('../exceptions');

class AudienciaService {

  async criarAudiencia(dataHora, local, resultado, processoId) {
    const processo = await Processo.findByPk(processoId);
    if (!processo) {
      throw new ProcessoNotFoundException('Processo não encontrado.');
    }

    const audiencia = await Audiencia.create({
      dataHora: dataHora,
      local: local,
      resultado: resultado,
      processoId: processo.id,
    });

    return audiencia;
  }

  async atualizarAudiencia(id, dataHora, local, resultado) {
    const audiencia = await Audiencia.findByPk(id);
    if (!audiencia) {
      throw new AudienciaNotFoundException('Audiência não encontrada.');
    }

    audiencia.dataHora = dataHora;
    audiencia.local = local;
    audiencia.resultado = resultado;

    await audiencia.save();
    return audiencia;
  }

  async buscarTodasAudiencias() {
    const audiencias = await Audiencia.findAll();
    return audiencias.map(audiencia => ({
      id: audiencia.id,
      dataHora: audiencia.dataHora,
      local: audiencia.local,
      resultado: audiencia.resultado,
    }));
  }

  async buscarAudienciaPorId(id) {
    const audiencia = await Audiencia.findByPk(id);
    if (!audiencia) {
      throw new AudienciaNotFoundException('Audiência não encontrada.');
    }

    return {
      id: audiencia.id,
      dataHora: audiencia.dataHora,
      local: audiencia.local,
      resultado: audiencia.resultado,
    };
  }

  async deletarAudiencia(id) {
    const audiencia = await Audiencia.findByPk(id);
    if (!audiencia) {
      throw new AudienciaNotFoundException('Audiência não encontrada.');
    }

    await audiencia.destroy();
  }
}

module.exports = new AudienciaService();
