var mongoose = require('mongoose'),
    debug = require('debug')('tecnospeed:db'),
    config = require('config');
'use_strict';
function _connection() {
    var   username = config.get('mongo.username'),
          password = config.get('mongo.password'),
          server = config.get('mongo.server'),
          port = config.get('mongo.port'),
          database = config.get('mongo.database'),
          auth = username ? username + ':' + password + '@' : '';
    return 'mongodb://' + auth + server + ':' + port + '/' + database;
}
mongoose.connect(_connection());
var db = mongoose.connection;
db.on('error', (err) => {
    debug(err);
});
db.once('open', (callback) => {
    debug('conectado ao mongo')
});
module.exports = mongoose;