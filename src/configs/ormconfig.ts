import { join } from "path";
import { ConnectionOptions } from "typeorm";

const configOrm: ConnectionOptions = {

    type: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'smartblind',
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

