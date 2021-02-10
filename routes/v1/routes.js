// Definicion de rutas
var usuario = require('./usuarios');
var loggin = require('./loggin');
var personas = require('./personas');
var contrato = require('./contrato');
var empContrato = require('./empleadoContrato');

// link de las rutas
module.exports = (app) => {
    app.use('/api/v1', usuario);
    app.use('/api/v1', loggin);
    app.use('/api/v1', personas);
    app.use('/api/v1', contrato);
    app.use('/api/v1', empContrato);
}
