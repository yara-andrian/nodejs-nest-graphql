module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'godwinekuma',
  password: '',
  database: 'invoiceapp',
  entities: ['dist/**/*.model.ts'],
  migrations: ['dist/src/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};