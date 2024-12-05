const express = require('express');
const router = express.Router();
const AudienciaService = require('../services/AudienciaService');
const ProcessoService = require('../services/ProcessoService');
const { Audiencia } = require('../models');
const { Processo } = require('../models');

// Criar audiência
router.post('/', async (req, res) => {
  const { processoId, data, local, status } = req.body;
  try {
    // Buscar o processo relacionado pela ID
    const processoDTO = await ProcessoService.buscarProcessoPorId(processoId);
    if (!processoDTO) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    // Criar a audiência com os dados fornecidos
    const novaAudiencia = await Audiencia.create({
      processoId,
      data,
      local,
      status,
    });

    res.status(201).json(novaAudiencia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar audiência', message: err.message });
  }
});

// Atualizar audiência
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, local, status } = req.body; 
  try {
    const audiencia = await Audiencia.findByPk(id);
    if (!audiencia) {
      return res.status(404).json({ error: 'Audiência não encontrada' });
    }

    // Atualizando a audiência
    audiencia.data = data;
    audiencia.local = local;
    audiencia.status = status;
    await audiencia.save();

    res.status(200).json(audiencia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar audiência', message: err.message });
  }
});

// Listar todas as audiências
router.get('/all', async (req, res) => {
  try {
    const audiencias = await Audiencia.findAll();
    res.status(200).json(audiencias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar audiências', message: err.message });
  }
});

// Buscar audiência por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const audiencia = await Audiencia.findByPk(id);
    if (!audiencia) {
      return res.status(404).json({ error: 'Audiência não encontrada' });
    }
    res.status(200).json(audiencia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar audiência', message: err.message });
  }
});

// Deletar audiência
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const audiencia = await Audiencia.findByPk(id);
    if (!audiencia) {
      return res.status(404).json({ error: 'Audiência não encontrada' });
    }

    // Deletando a audiência
    await audiencia.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar audiência', message: err.message });
  }
});

module.exports = router;
