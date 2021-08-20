import express from 'express';
import { mapOrder } from '*/utillities/sort';

const app = express();

const hostname = 'localhost';
const port = 3000;

app.get('/', (req, res) => {
    res.end('<h1>Hello World!<h1>');
});

app.listen(port, hostname, () => {
    console.log( `hello ${hostname}:${port}`);
});