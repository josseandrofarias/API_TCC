
exports.up = function(knex) {
  return knex.schema.createTable('pedido', table => {
      table.increments('id').primary()
      table.integer('id_pessoa').references('id')
          .inTable('pessoa').notNullable()
      table.integer('id_setor').references('id')
          .inTable('setor').notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      table.text('obs')
      table.integer('tipo')
      table.integer('status').notNullable().defaultTo(1).comment('1: Ativo , 2: Andamento, 3: Concluído')
      table.dateTime('data_hora').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedido')
};
