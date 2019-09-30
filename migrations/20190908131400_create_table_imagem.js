
exports.up = function(knex) {
  return knex.schema.createTable('imagem', table => {
      table.increments('id').primary()
      table.integer('id_pedido').references('id')
          .inTable('pedido').notNullable()
      table.string('caminho').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('imagem')
};
