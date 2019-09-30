
exports.up = function(knex) {
  return knex.schema.createTable('empresa', table => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.boolean('status').notNullable().defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('empresa')
};
