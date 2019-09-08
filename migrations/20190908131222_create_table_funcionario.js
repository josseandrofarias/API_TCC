
exports.up = function(knex) {
  return knex.schema.createTable('funcionario', table => {
      table.increments('id').primary()
      table.integer('id_pessoa').references('id')
          .inTable('pessoa').notNullable()
      table.integer('id_setor').references('id')
          .inTable('setor')
      table.boolean('status').notNullable().defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('funcionario')
};
