const app = require('./index');

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Servidor rodando http://%s:%s', host, port);
});