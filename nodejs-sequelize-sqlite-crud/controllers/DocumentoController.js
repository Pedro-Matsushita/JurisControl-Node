const express = require('express');
const router = express.Router();
const DocumentoService = require('../services/DocumentoService'); // Serviço de documentos
const { Documento } = require('../models'); // Modelo Documento

// Criar documento
router.post('/add/:id', async (req, res) => {
  const { id } = req.params;
  const docsDTO = req.body;
  try {
    const documentoCriado = await DocumentoService.criarDocumento(docsDTO);
    res.status(201).json(documentoCriado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar documento', message: err.message });
  }
});

// Buscar documento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const documento = await DocumentoService.buscarDocumento(id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }
    res.status(200).json(documento);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar documento', message: err.message });
  }
});

// Buscar todos os documentos
router.get('/all', async (req, res) => {
  try {
    const documentos = await DocumentoService.buscarTodosDocumentos();
    res.status(200).json(documentos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar documentos', message: err.message });
  }
});

// Atualizar documento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const documentoAtualizado = await DocumentoService.atualizarDocumento(id, updatedData);
    res.status(200).json(documentoAtualizado);
  } catch (err) {
    res.status(404).json({ error: 'Documento não encontrado', message: err.message });
  }
});

// Deletar documento
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await DocumentoService.deletarDocumento(id);
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(404).json({ error: 'Documento não encontrado', message: err.message });
  }
});

module.exports = router;
