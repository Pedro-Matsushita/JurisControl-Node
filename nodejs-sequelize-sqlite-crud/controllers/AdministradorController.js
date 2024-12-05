const express = require('express');
const router = express.Router();
const AdministradorService = require('../services/AdministradorService'); // Importando o serviço

// Criar administrador
router.post('/cadastrar', async (req, res) => {
  try {
    const administradorCriado = await AdministradorService.criarAdministrador(req.body);
    res.status(201).json(administradorCriado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar administrador', message: err.message });
  }
});

// Atualizar administrador
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const administradorAtualizado = await AdministradorService.atualizarAdministrador(id, req.body);
    res.status(200).json(administradorAtualizado);
  } catch (err) {
    res.status(404).json({ error: 'Administrador não encontrado', message: err.message });
  }
});

// Buscar administrador por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const administrador = await AdministradorService.buscarPorIdAdministrador(id);
    res.status(200).json(administrador);
  } catch (err) {
    res.status(404).json({ error: 'Administrador não encontrado', message: err.message });
  }
});

// Buscar todos os administradores
router.get('/all', async (req, res) => {
  try {
    const administradores = await AdministradorService.buscarTodosAdministradores();
    res.status(200).json(administradores);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar administradores', message: err.message });
  }
});

// Deletar administrador
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await AdministradorService.deletarAdministrador(id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(404).json({ error: 'Administrador não encontrado', message: err.message });
  }
});

module.exports = router;
