
exports.up = function(knex) {
  return knex.schema.createTable('avaliacao', table  => {
      table.increments('id').primary()
      table.integer('id_pedido').references('id')
          .inTable('pedido').notNullable()
      table.text('comentario')
      table.integer('avaliacao').notNullable().defaultTo(5)
      table.dateTime('data_hora').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('avaliacao')
};
