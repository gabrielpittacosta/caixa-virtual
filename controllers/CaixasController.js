const Promise = require('bluebird');

var handleNotFound = function(data) {
  if(!data) {
    var err = new Error('Not found');
    err.status = 404;
    throw err;
  }
  return data;
};

function CaixaController(CaixaModel) {
    this.model = Promise.promisifyAll(CaixaModel);
}

CaixaController.prototype.getAll = function(req, res, next) {
    this.model.findAsync({})
        .then(function(data) {
          res.json(data);
        })
        .catch(next);
  };

CaixaController.prototype.getById = function(req, res, next) {
  var _id = req.params._id;
  this.model.findOneAsync(_id)
      .then(handleNotFound)
      .then(function(data) {
        res.json(data);
      })
      .catch(next);
};

CaixaController.prototype.create = function(req, res, next) {
  var body = req.body;
  this.model.createAsync(body)
      .then(function (data) {
        res.json(data);
      })
      .catch(next);
};

CaixaController.prototype.remove = function(req, res, next) {
  var _id = req.params._id;
  this.model.removeAsync(_id)
      .then(function(data) {
        res.json(data);
      })
      .catch(next);
};

CaixaController.prototype.receberPagamento = function(req, res, next) {
  var _id = req.params._id;
      body = req.body;
      movimentacao = {
        Saldo: req.body.valor,
        entrada: {
          data: new Date,
          categoria: { _id: req.params._id, name: 'Contas Loja' },
          valor: req.body.valor,
          tipo: 'Contas',
          descricao: 'Conta de luz',
          message: 'CAIXA ATUALIZADO'
        }
      }
  res.json(movimentacao);
  this.model.updateAsync(_id, body)
      .then(function(data) {
        res.json(data);
      })
      .catch(next);
};

CaixaController.prototype.realizarPagamento = function(req, res, next) {
  var _id = req.params._id;
      body = req.body;
      movimentacao = {
        Saldo: req.body.valor,
        saida: {
          data: new Date,
          categoria: { _id: req.params._id, name: 'Contas Loja' },
          valor: req.body.valor,
          tipo: 'Contas',
          descricao: 'Conta de luz',
          message: 'CAIXA ATUALIZADO'
        }
      }
  res.json(movimentacao);
  this.model.updateAsync(_id, body)
      .then(function(data) {
        res.json(data);
      })
      .catch(next);
};

module.exports = function(CaixaModel) {
  return new CaixaController(CaixaModel);
};
