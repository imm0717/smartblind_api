import { join } from "path";
import { ConnectionOptions } from "typeorm";

const configOrm: ConnectionOptions = {

    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ join(__dirname, '/../**/entity/*{.ts,.js}')],
    synchronize: false,
    migrationsRun: false,
    logging: true,
    migrations: [join(__dirname, '/../../migrations/*{.ts,.js}')],
    cli: {
        migrationsDir: './migrations',
        entitiesDir: "src/**/entity/*.{.ts,.js}"
    },

}

export = configOrm

