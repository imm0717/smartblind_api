import { ConnectionOptions } from "typeorm";
const config: ConnectionOptions = {
    type: 'mysql',
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "smartblind",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    logging: true,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: './migrations',
    },
}

export = config
