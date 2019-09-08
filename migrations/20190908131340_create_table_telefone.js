
exports.up = function(knex) {
  return knex.schema.createTable('telefone', table => {
      table.increments('id').primary()
      table.integer('id_pessoa').references('id')
          .inTable('pessoa').notNullable()
      table.float('numero', 15).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('telefone')
};
