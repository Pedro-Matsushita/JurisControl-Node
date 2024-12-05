const express = require('express');
const router = express.Router();
const ProcessoService = require('../services/ProcessoService'); // Serviço de processos
const { Processo } = require('../models'); // Modelo Processo

// Criar processo
router.post('/add', async (req, res) => {
  const { dto } = req.body;
  try {
    const processoCriado = await ProcessoService.criarProcesso(dto);
    res.status(201).json(processoCriado);
  } catch (err) {
    if (err instanceof AdvogadoNotFoundException || err instanceof ClienteNotFoundException) {
      return res.status(404).json({ error: 'Advogado ou Cliente não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao criar processo', message: err.message });
  }
});

// Atualizar processo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const processoAtualizado = await ProcessoService.atualizarProcesso(id, updatedData);
    res.status(200).json(processoAtualizado);
  } catch (err) {
    if (err instanceof ProcessoNotFoundException) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar processo', message: err.message });
  }
});

// Listar todos os processos
router.get('/all', async (req, res) => {
  try {
    const processos = await ProcessoService.listarTodosProcessos();
    res.status(200).json(processos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar processos', message: err.message });
  }
});

// Buscar processo por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const processo = await ProcessoService.buscarProcessoPorId(id);
    if (!processo) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }
    res.status(200).json(processo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar processo', message: err.message });
  }
});

// Deletar processo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await ProcessoService.deletarProcesso(id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err instanceof ProcessoNotFoundException) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar processo', message: err.message });
  }
});

module.exports = router;
