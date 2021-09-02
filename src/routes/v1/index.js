import express from 'express';
import { httpStatusCode } from '../../utillities/constants';
import { boardRoute } from './board.route';

const Router = express.Router();
/**
 * GET
 * v1
 */
Router.get('/status', (req, res) => {
    res.status(httpStatusCode.OK).json({
        status: 'Hello World'
    });
});

Router.use('/boards', boardRoute);

export const apiV1 = Router;