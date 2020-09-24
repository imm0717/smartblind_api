import * as configOrm from "./ormconfig";
export default {
    port: parseInt(process.env.PORT, 10) || 3000,
    app_key: process.env.APP_KEY || 'smartblind',
    upload_path: process.env.UPLOAD_PATH,
    database: configOrm
}