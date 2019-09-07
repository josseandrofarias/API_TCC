const path = require('path')
const config = require(path.resolve( 'knexfile.js'))
const knex = require('knex')(config['development'])

knex.migrate.latest([config])
module.exports = knex