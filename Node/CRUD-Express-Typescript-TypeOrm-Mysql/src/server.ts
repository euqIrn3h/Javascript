import express from 'express';
import 'dotenv/config';
import { AppDataSource } from './database/data-source';
import routes from './Routes';

AppDataSource.initialize()
    .then(() => console.log("DB Inicializado!"))
    .catch(() => console.log("DB não inicializado!"));

const app = express();
const PORT = process.env.SERVER_PORT as number | undefined;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))