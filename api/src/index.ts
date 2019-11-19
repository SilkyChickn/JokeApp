import express from 'express';
import { DatabaseConnection } from './modules/database';
import bodyParser from 'body-parser';
import { globalRouter } from './routers/global.router';

//Create webserver
const app: express.Application = express();

//Global middlewares
app.use(bodyParser.json());

//Global router
app.use("/api/v1", globalRouter);

//Start database and server
DatabaseConnection.connect().then(() => {
    app.listen(process.env.API_PORT, () => {
        console.log(`Server is running on port ${process.env.API_PORT}...`);
    });
}).catch((error: Error) => {
    console.log(error);
});