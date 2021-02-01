module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_URL || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'godwinekuma',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'invoiceapp',
  entities: ['dist/**/*.model.ts'],
  migrations: ['dist/src/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};