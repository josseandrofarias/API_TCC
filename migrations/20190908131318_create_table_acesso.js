
exports.up = function(knex) {
  return knex.schema.createTable('acesso', table => {
      table.increments('id').primary()
      table.integer('id_funcionario').references('id')
          .inTable('funcionario')
      table.integer('id_pessoa').references('id')
          .inTable('pessoa')
      table.dateTime('data_hora').notNullable().defaultTo(knex.fn.now())
      table.bigInteger('ip')
      table.boolean('app').notNullable().defaultTo(true)
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('acesso')
};
