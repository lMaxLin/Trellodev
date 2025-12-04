import type { Knex } from 'knex'
import * as dotenv from 'dotenv';
dotenv.config();

const connection = process.env.DATABASE_URL;

const config: Knex.Config = {
    client: 'pg',
    connection,
    migrations: {
        tableName: 'migrations',
        directory: './migrations'
    }
}

export default config;