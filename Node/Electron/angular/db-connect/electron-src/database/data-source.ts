import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: `${__dirname}/../../electron-build/database/database.sql`,
    entities: [`${__dirname}/**/models/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});