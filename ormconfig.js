module.exports = [
  {
    type: process.env.DATABASE_TYPE || "postgres",
    url: process.env.DATABASE_TYPE + '://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME,
    synchronize: false,
    migrations: ["dist/src/migrations/*{.ts,.js}"],
    entities: ["dist/src/**/*.entity{.ts,.js}"],
    seeds: ["dist/src/**/*.seed{.ts,.js}"],
    cli: {
      migrationsDir: "src/migrations"
    },
    ssl: {
      rejectUnauthorized: false,
    },
  },
  {
    name: process.env.DATABASE_LOG_ID || 'logDatabase',
    type: process.env.DATABASE_LOG_TYPE || "postgres",
    url: process.env.DATABASE_LOG_TYPE + '://' + process.env.DATABASE_LOG_USERNAME + ':' + process.env.DATABASE_LOG_PASSWORD + '@' + process.env.DATABASE_LOG_HOST + ':' + process.env.DATABASE_LOG_PORT + '/' + process.env.DATABASE_LOG_NAME,
    synchronize: false,
    migrations: ["dist/src/migrationsLogs/*{.ts,.js}"],
    entities: ["dist/src/**/*.logs.entity{.ts,.js}"],
    seeds: ["dist/src/**/*.logs.seed{.ts,.js}"],
    cli: {
      migrationsDir: "src/migrationsLogs"
    },
    ssl: {
      rejectUnauthorized: false,
    },
  },
]
