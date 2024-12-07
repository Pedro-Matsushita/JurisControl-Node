const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Advogado, Cliente, Audiencia, Processo, RegistroDeInfo, Administrador, Escritorio } = require('./models'); // Importando os modelos

const app = express();
app.use(bodyParser.json());

// Criar um Advogado
app.post('/advogados', async (req, res) => {
  try {
    const advogado = await Advogado.create(req.body);
    res.status(201).json(advogado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar um Advogado por ID
app.get('/advogados/:id', async (req, res) => {
  try {
    const advogado = await Advogado.findByPk(req.params.id);
    if (advogado) {
      res.json(advogado);
    } else {
      res.status(404).json({ error: 'Advogado não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os Advogados
app.get('/advogados', async (req, res) => {
  try {
    const advogados = await Advogado.findAll();
    res.json(advogados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar um Cliente
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar um Cliente por ID
app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os Clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma Audiência
app.post('/audiencias', async (req, res) => {
  try {
    const audiencia = await Audiencia.create(req.body);
    res.status(201).json(audiencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar uma Audiência por ID
app.get('/audiencias/:id', async (req, res) => {
  try {
    const audiencia = await Audiencia.findByPk(req.params.id);
    if (audiencia) {
      res.json(audiencia);
    } else {
      res.status(404).json({ error: 'Audiência não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todas as Audiências
app.get('/audiencias', async (req, res) => {
  try {
    const audiencias = await Audiencia.findAll();
    res.json(audiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar um Processo
app.post('/processos', async (req, res) => {
  try {
    const processo = await Processo.create(req.body);
    res.status(201).json(processo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar um Processo por ID
app.get('/processos/:id', async (req, res) => {
  try {
    const processo = await Processo.findByPk(req.params.id);
    if (processo) {
      res.json(processo);
    } else {
      res.status(404).json({ error: 'Processo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os Processos
app.get('/processos', async (req, res) => {
  try {
    const processos = await Processo.findAll();
    res.json(processos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar um RegistroDeInfo
app.post('/registros_de_info', async (req, res) => {
  try {
    const registroDeInfo = await RegistroDeInfo.create(req.body);
    res.status(201).json(registroDeInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar um RegistroDeInfo por ID
app.get('/registros_de_info/:id', async (req, res) => {
  try {
    const registroDeInfo = await RegistroDeInfo.findByPk(req.params.id);
    if (registroDeInfo) {
      res.json(registroDeInfo);
    } else {
      res.status(404).json({ error: 'Registro de informação não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os RegistrosDeInfo
app.get('/registros_de_info', async (req, res) => {
  try {
    const registrosDeInfo = await RegistroDeInfo.findAll();
    res.json(registrosDeInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um RegistroDeInfo
app.put('/registros_de_info/:id', async (req, res) => {
  try {
    const registroDeInfo = await RegistroDeInfo.findByPk(req.params.id);
    if (registroDeInfo) {
      await registroDeInfo.update(req.body);
      res.json(registroDeInfo);
    } else {
      res.status(404).json({ error: 'Registro de informação não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um RegistroDeInfo
app.delete('/registros_de_info/:id', async (req, res) => {
  try {
    const registroDeInfo = await RegistroDeInfo.findByPk(req.params.id);
    if (registroDeInfo) {
      await registroDeInfo.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Registro de informação não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar um Administrador
app.post('/administradores', async (req, res) => {
  try {
    const administrador = await Administrador.create(req.body);
    res.status(201).json(administrador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar um Administrador por ID
app.get('/administradores/:id', async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      res.json(administrador);
    } else {
      res.status(404).json({ error: 'Administrador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os Administradores
app.get('/administradores', async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um Administrador
app.put('/administradores/:id', async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      await administrador.update(req.body);
      res.json(administrador);
    } else {
      res.status(404).json({ error: 'Administrador não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um Administrador
app.delete('/administradores/:id', async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      await administrador.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Administrador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Criar um Escritorio
app.post('/escritorios', async (req, res) => {
  try {
    const escritorio = await Escritorio.create(req.body);
    res.status(201).json(escritorio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar um Escritorio por ID
app.get('/escritorios/:id', async (req, res) => {
  try {
    const escritorio = await Escritorio.findByPk(req.params.id);
    if (escritorio) {
      res.json(escritorio);
    } else {
      res.status(404).json({ error: 'Escritório não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os Escritorios
app.get('/escritorios', async (req, res) => {
  try {
    const escritorios = await Escritorio.findAll();
    res.json(escritorios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um Escritorio
app.put('/escritorios/:id', async (req, res) => {
  try {
    const escritorio = await Escritorio.findByPk(req.params.id);
    if (escritorio) {
      await escritorio.update(req.body);
      res.json(escritorio);
    } else {
      res.status(404).json({ error: 'Escritório não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um Escritorio
app.delete('/escritorios/:id', async (req, res) => {
  try {
    const escritorio = await Escritorio.findByPk(req.params.id);
    if (escritorio) {
      await escritorio.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Escritório não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
