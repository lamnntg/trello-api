import express from 'express';
import { mapOrder } from '*/utillities/sort';
import { connectDB } from '*/config/mongodb';
import { env } from '*/config/environtments';

const app = express();

const hostname = env.HOST;
const port = env.PORT;

connectDB().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.end('<h1>Hello World!<h1>');
});

app.listen(port, hostname, () => {
    console.log( `hello ${hostname}:${port}`);
});