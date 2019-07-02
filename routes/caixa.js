const express = require('express');
const router = express.Router();

var mongoose = require('../db/mongo');
var CaixaModel = require('../models/CaixaModel')(mongoose);
var CaixaController = require('../controllers/CaixasController')(CaixaModel);

router.get('/', CaixaController.getAll.bind(CaixaController));
router.get('/:_id',  CaixaController.getById.bind(CaixaController));
router.post('/', CaixaController.create.bind(CaixaController));
router.delete('/:_id', CaixaController.remove.bind(CaixaController));
router.put('/:_id/entrada', CaixaController.receberPagamento.bind(CaixaController));
router.put('/:_id/saida', CaixaController.realizarPagamento.bind(CaixaController));

module.exports = router;