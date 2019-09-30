// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: "35.247.239.3",
      database: 'tccesbd',
      user:     'josseandrofarias',
      password: 'ASDFGh@123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: "35.247.239.3",
      database: 'tccesbd',
      user:     'josseandrofarias',
      password: 'ASDFGh@123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
