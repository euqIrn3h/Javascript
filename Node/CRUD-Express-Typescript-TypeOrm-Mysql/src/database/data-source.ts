import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: process.env.DATABASE_PORT as number | undefined,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    entities: [`${__dirname}/**/models/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});