
exports.up = function(knex) {
  return knex.schema.createTable('parecer', table => {
      table.increments('id').primary()
      table.integer('id_pedido').references('id')
          .inTable('pedido')
      table.text('parecer')
      table.dateTime('data_hora').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('parecer')
};
