module.exports = {
  type: process.env.DATABASE_TYPE || "postgres",
  // url: process.env.DATABASE_TYPE + '://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME,
  // url: 'postgres://fwphdjqkggapmx:dbcdc903a9f17b3186b96e4d6c3f10a7eb29e7a61d9da2c4ac0192a331dd4fb5@ec2-3-232-22-121.compute-1.amazonaws.com:5432/d9p4m19hkflote',
  url: 'postgres://emrbackend:0P48e{$tqk]V?&GndWdI3]CHa)G;z9m{@ls-47a047cab644f437c55e363a98a2253745c53f64.c7pmtuahr2cl.us-east-1.rds.amazonaws.com:5432/emrbackend',
  synchronize: false,
  migrations: ["dist/migrations/*{.ts,.js}"],
  entities: ["dist/**/*.entity{.ts,.js}"],
  seeds: ["dist/**/*.seed{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations"
  }
}