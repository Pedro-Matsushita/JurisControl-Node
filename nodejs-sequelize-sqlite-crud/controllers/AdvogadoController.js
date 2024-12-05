const express = require('express');
const router = express.Router();
const AdvogadoService = require('../services/AdvogadoService');  // Importando o serviço

// Criar advogado
router.post('/cadastrar', async (req, res) => {
  try {
    const advogadoCriado = await AdvogadoService.criarAdvogado(req.body);
    res.status(201).json(advogadoCriado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar advogado', message: err.message });
  }
});

// Atualizar advogado
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const advogadoAtualizado = await AdvogadoService.atualizarAdvogado(id, req.body);
    res.status(200).json(advogadoAtualizado);
  } catch (err) {
    res.status(404).json({ error: 'Advogado não encontrado', message: err.message });
  }
});

// Buscar advogado por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const advogado = await AdvogadoService.buscarPorIdAdvogado(id);
    res.status(200).json(advogado);
  } catch (err) {
    res.status(404).json({ error: 'Advogado não encontrado', message: err.message });
  }
});

// Buscar todos os advogados
router.get('/all', async (req, res) => {
  try {
    const advogados = await AdvogadoService.buscarTodosAdvogados();
    res.status(200).json(advogados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar advogados', message: err.message });
  }
});

// Deletar advogado
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await AdvogadoService.deletarAdvogado(id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(404).json({ error: 'Advogado não encontrado', message: err.message });
  }
});

module.exports = router;
