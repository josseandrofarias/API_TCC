
exports.up = function(knex) {
    return knex.schema.createTable('setor', table => {
        table.increments('id').primary()
        table.integer('id_empresa').references('id')
            .inTable('empresa').notNullable()
        table.string('nome', 100).notNullable()
        table.boolean('status').notNullable().defaultTo(true)
    })
};

exports.down = function(knex) {
  knex.schema.dropTable('setor')
};
