import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { SUCCESS } from './src/utils/responseCode';
import mainRoute from './src/routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ping', (req: any, res: any) => {
    return res.status(SUCCESS).send('pong');
});

app.use('/api', mainRoute);

export default app;
