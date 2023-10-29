"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "".concat(__dirname, "/../../electron-build/database/database.sql"),
    entities: ["".concat(__dirname, "/**/models/*.{ts,js}")],
    migrations: ["".concat(__dirname, "/**/migrations/*.{ts,js}")]
});
