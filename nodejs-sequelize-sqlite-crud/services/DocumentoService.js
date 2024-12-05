const { Documento, Processo } = require('../models');
const { DocumentoNotFoundException, ProcessoNotFoundException } = require('../exceptions');
const fs = require('fs').promises;

class DocumentoService {
  
  // Criar um novo documento
  async criarDocumento(processoId, titulo, tipoDocumento, tamanhoDoc, anexo) {
    const processo = await Processo.findByPk(processoId);
    if (!processo) {
      throw new ProcessoNotFoundException('Processo não encontrado.');
    }

    const documento = await Documento.create({
      processoId: processo.id,
      titulo,
      tipoDocumento,
      tamanhoDoc,
      anexo, // Recebendo como buffer ou string
    });

    return documento;
  }

  // Buscar documento por ID
  async buscarPorIdDocumento(id) {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      throw new DocumentoNotFoundException('Documento não encontrado.');
    }

    return {
      titulo: documento.titulo,
      anexo: documento.anexo,
    };
  }

  // Buscar todos os documentos
  async buscarTodosDocumentos() {
    const documentos = await Documento.findAll();
    return documentos.map(doc => ({
      titulo: doc.titulo,
      anexo: doc.anexo,
    }));
  }

  // Atualizar um documento
  async atualizarDocumento(id, titulo, tipoDocumento, anexo) {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      throw new DocumentoNotFoundException('Documento não encontrado.');
    }

    documento.titulo = titulo;
    documento.tipoDocumento = tipoDocumento;
    documento.anexo = anexo;
    await documento.save();

    return documento;
  }

  // Deletar um documento
  async deletarDocumento(id) {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      throw new DocumentoNotFoundException('Documento não encontrado.');
    }

    await documento.destroy();
  }
}

module.exports = new DocumentoService();
