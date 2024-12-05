const express = require('express');
const router = express.Router();
const RegistroDeInfoService = require('../services/RegistroDeInfoService');
const ProcessoService = require('../services/ProcessoService');
const { RegistroDeInfo } = require('../models'); 
const { Processo } = require('../models'); 

// Criar registro de informação
router.post('/', async (req, res) => {
  const { processoId, informacao } = req.body; // Assumindo os dados diretos no corpo da requisição
  try {
    // Buscar o processo relacionado pela ID
    const processo = await ProcessoService.buscarProcessoPorId(processoId);
    if (!processo) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    // Criar o registro de informação com os dados fornecidos
    const novoRegistroDeInfo = await RegistroDeInfo.create({
      processoId,
      informacao,
    });

    res.status(201).json(novoRegistroDeInfo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar registro de informação', message: err.message });
  }
});

// Listar todos os registros de informação
router.get('/all', async (req, res) => {
  try {
    const registrosDeInfo = await RegistroDeInfo.findAll();
    res.status(200).json(registrosDeInfo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar registros de informação', message: err.message });
  }
});

// Buscar registro de informação por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const registroDeInfo = await RegistroDeInfo.findByPk(id);
    if (!registroDeInfo) {
      return res.status(404).json({ error: 'Registro de informação não encontrado' });
    }
    res.status(200).json(registroDeInfo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar registro de informação', message: err.message });
  }
});

// Deletar registro de informação
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const registroDeInfo = await RegistroDeInfo.findByPk(id);
    if (!registroDeInfo) {
      return res.status(404).json({ error: 'Registro de informação não encontrado' });
    }

    // Deletando o registro de informação
    await registroDeInfo.destroy();
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar registro de informação', message: err.message });
  }
});

module.exports = router;
