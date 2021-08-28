import express from 'express';
import { mapOrder } from '*/utillities/sort';
import { connectDB, getDB } from '*/config/mongodb';
import { env } from '*/config/environtments';
import { boardModel } from '*/models/board.model';

connectDB()
    .then(() => {
        console.log('connected db server');
    })
    .then(() => {
        bootServer();
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });

const bootServer = () => {
    const app = express();

    app.get('/', async (req, res) => {
        const dbIntance = getDB();

        await dbIntance.collection('boards').insertOne(
            {
                title: 'lammngyuyen'
            }
        );
        res.end('<h1>Hello World!<h1>');
    });

    app.get('/test', async (req, res) => {
        const fakeData = {
            title: 'sadasd'
        }
        let result = await boardModel.createBoard(fakeData);
        console.log(result);
        res.end('<h1>Route Test<h1>');
    });

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`hello ${env.APP_HOST}:${env.APP_PORT}`);
    });
};