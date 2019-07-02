const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function CaixaDAO(model) {
    this.model = model;
}

CaixaDAO.prototype.find = function (query, callback) {
    this.model.find(query).exec(callback);
};

CaixaDAO.prototype.findOne = function (_id, callback) {
    var query = { _id: _id };
    this.model.findOne(query).exec(callback);
};

CaixaDAO.prototype.create = function (data, callback) {
    var model = new this.model(data);
    model.save((err, result) =>{
        callback(err, result);
    });
};

CaixaDAO.prototype.update = function (_id ,data, callback)  {
    var query = { _id: _id };
    this.model.update(query, data).exec((err, result) => {
        callback(err, result);
    });
};

CaixaDAO.prototype.remove = function (_id, callback)  {
    var query = { _id: _id };
    this.model.remove(query).exec((err, result) => {
        callback(err, result);
    });
};

var CategoriaSchema = new Schema({
    name: String
})

var MovimentoSchema = new Schema({
    tipo: {type: String, default: 'A'},
    valor: { type:Number, default: 14},
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'caixa'}
})

var CaixaSchema = new Schema({
    name: { type:String, default: 'Caixa' },
    saldoTotal: {type: Number, default: 0 },
    movimento: [MovimentoSchema]
})

module.exports = function (mongoose)  {
    var Caixa = mongoose.model('caixa', CaixaSchema );
    return new CaixaDAO(Caixa);
}
