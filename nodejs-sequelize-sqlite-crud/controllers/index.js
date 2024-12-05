const express = require('express');
const router = express.Router();

// Importando os controladores
const administradorController = require('./AdministradorController');
const escritorioController = require('./EscritorioController');
const registroDeInfoController = require('./RegistroDeInfoController');
const audienciaController = require('./AudienciaController');
const processoController = require('./ProcessoController');
const advogadoController = require('./AdvogadoController');
const clienteController = require('./ClienteController');
const documentoController = require('./DocumentoController')

// Registrando as rotas dos controladores
router.use('/documentos', documentoController)
router.use('/administradores', administradorController)
router.use('/escritorios', escritorioController);
router.use('/registrosDeInfo', registroDeInfoController);
router.use('/audiencias', audienciaController);
router.use('/processos', processoController);
router.use('/advogados', advogadoController);
router.use('/clientes', clienteController);

module.exports = router;
