
exports.up = function(knex) {
  return knex.schema.createTable('funcionario', table => {
      table.increments('id').primary()
      table.integer('id_pessoa').references('id')
          .inTable('pessoa').notNullable()
      table.integer('id_setor').references('id')
          .inTable('setor')
  })
};

exports.down = function(knex) {
  return knex.dropTable('funcionario')
};
