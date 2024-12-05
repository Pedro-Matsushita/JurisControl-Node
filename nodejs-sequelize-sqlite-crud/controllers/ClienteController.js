const express = require('express');
const router = express.Router();
const ClienteService = require('../services/ClienteService');

// Criar cliente
router.post('/cadastrar', async (req, res) => {
  const { nome, tipoCliente, cpfCnpj, endereco } = req.body;
  try {
    // Criar o cliente
    const novoCliente = await ClienteService.criarCliente({ nome, tipoCliente, cpfCnpj, endereco });
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar cliente', message: err.message });
  }
});

// Atualizar cliente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const clienteAtualizado = await ClienteService.atualizarCliente(id, req.body);
    res.status(200).json(clienteAtualizado);
  } catch (err) {
    res.status(404).json({ error: 'Cliente não encontrado', message: err.message });
  }
});

// Buscar todos os clientes
router.get('/all', async (req, res) => {
  try {
    const clientes = await ClienteService.buscarTodosClientes();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar clientes', message: err.message });
  }
});

// Buscar cliente por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await ClienteService.buscarClientePorId(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cliente', message: err.message });
  }
});

// Deletar cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await ClienteService.deletarCliente(id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(404).json({ error: 'Cliente não encontrado', message: err.message });
  }
});

module.exports = router;
