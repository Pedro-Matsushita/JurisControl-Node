const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Administrador, Advogado, Audiencia, Cliente, Documento, Escritorio, Processo, RegistroDeInfo } = require('./models'); // importa os modelos corretamente

const app = express();
app.use(bodyParser.json());

// Rota para criar um Administrador
app.post('/administradores', async (req, res) => {
  try {
    const administrador = await Administrador.create(req.body);
    res.status(201).json(administrador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um Advogado
app.post('/advogados', async (req, res) => {
  try {
    const advogado = await Advogado.create(req.body);
    res.status(201).json(advogado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar uma Audiencia
app.post('/audiencias', async (req, res) => {
  try {
    const audiencia = await Audiencia.create(req.body);
    res.status(201).json(audiencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um Cliente
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um Documento
app.post('/documentos', async (req, res) => {
  try {
    const documento = await Documento.create(req.body);
    res.status(201).json(documento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um Processo
app.post('/processos', async (req, res) => {
  try {
    const processo = await Processo.create(req.body);
    res.status(201).json(processo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um RegistroDeInfo
app.post('/registros-de-info', async (req, res) => {
  try {
    const registroDeInfo = await RegistroDeInfo.create(req.body);
    res.status(201).json(registroDeInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para criar um Escritorio
app.post('/escritorios', async (req, res) => {
  try {
    const escritorio = await Escritorio.create(req.body);
    res.status(201).json(escritorio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os Administradores
app.get('/administradores', async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os Advogados
app.get('/advogados', async (req, res) => {
  try {
    const advogados = await Advogado.findAll();
    res.json(advogados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todas as Audiências
app.get('/audiencias', async (req, res) => {
  try {
    const audiencias = await Audiencia.findAll();
    res.json(audiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os Clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os Documentos
app.get('/documentos', async (req, res) => {
  try {
    const documentos = await Documento.findAll();
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os Processos
app.get('/processos', async (req, res) => {
  try {
    const processos = await Processo.findAll();
    res.json(processos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os Registros de Info
app.get('/registros-de-info', async (req, res) => {
  try {
    const registrosDeInfo = await RegistroDeInfo.findAll();
    res.json(registrosDeInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os Escritórios
app.get('/escritorios', async (req, res) => {
  try {
    const escritorios = await Escritorio.findAll();
    res.json(escritorios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
