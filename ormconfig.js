module.exports = {
  type: process.env.DATABASE_TYPE || "postgres",
  // url: 'postgres://fwphdjqkggapmx:dbcdc903a9f17b3186b96e4d6c3f10a7eb29e7a61d9da2c4ac0192a331dd4fb5@ec2-3-232-22-121.compute-1.amazonaws.com:5432/d9p4m19hkflote',
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
}
