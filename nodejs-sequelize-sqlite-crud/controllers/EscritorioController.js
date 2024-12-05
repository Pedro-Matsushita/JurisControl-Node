const express = require('express');
const router = express.Router();
const EscritorioService = require('../services/EscritorioService');
const { EscritorioNotFoundException } = require('../exceptions');

// Criar um novo escritório
router.post('/', async (req, res) => {
  const { nome, cnpj, telefone } = req.body;
  
  try {
    const escritorio = await EscritorioService.criarEscritorio(nome, cnpj, telefone);
    return res.status(201).json(escritorio);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});

// Atualizar um escritório
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, telefone } = req.body;

  try {
    const escritorio = await EscritorioService.atualizarEscritorio(id, nome, cnpj, telefone);
    return res.status(200).json(escritorio);
  } catch (error) {
    if (error instanceof EscritorioNotFoundException) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Buscar todos os escritórios
router.get('/', async (req, res) => {
  try {
    const escritorios = await EscritorioService.buscarTodosEscritorios();
    return res.status(200).json(escritorios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar escritórios' });
  }
});

// Buscar um escritório por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const escritorio = await EscritorioService.buscarPorIdEscritorio(id);
    return res.status(200).json(escritorio);
  } catch (error) {
    if (error instanceof EscritorioNotFoundException) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar o escritório' });
  }
});

// Deletar um escritório
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await EscritorioService.deletarEscritorio(id);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof EscritorioNotFoundException) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar o escritório' });
  }
});

module.exports = router;
