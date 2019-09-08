const path = require('path')
const server = require( path.resolve( 'src', 'config', 'server.js')) //start server

const db = require(path.resolve( 'src', 'config', 'db.js'))
const consign = require('consign')

consign()
    .then(path.resolve('/src', 'config', 'middlewares.js'))
    .then(path.resolve('/src', 'config', 'auth.js'))
    .then(path.resolve('/src', 'controllers'))
    .then(path.resolve('/src', 'routes', 'principal.js'))
    .into(server)

server.db = db

!server ? console.log('Erro ao iniciar server API' ) : console.log('API iniciada')





