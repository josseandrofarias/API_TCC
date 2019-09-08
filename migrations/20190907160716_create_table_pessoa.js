
exports.up = function(knex) {
  return knex.schema.createTable('pessoa', table => {
      table.increments('id').primary()
      table.string('nome', 100).notNullable()
      table.string('email', 100).notNullable().unique()
      table.bigInteger('cpf', 12).notNullable().unique()
      table.date('data_nascimento').notNullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.string('senha', 255).notNullable()
      table.string('img').defaultTo(null)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pessoa')
};
