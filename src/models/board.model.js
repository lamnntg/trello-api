import Joi from 'joi';
import { getDB } from '*/config/mongodb';

const boardCollectionName = 'boards';

const boardSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    columnOrder: Joi.array()
        .items(Joi.string())
        .default([]),

    created_at: Joi.date()
        .timestamp()
        .default(Date.now()),

    updated_at: Joi.date()
        .timestamp()
        .default(null),

    __destroy: Joi.boolean()
        .default(false)
});

const validateBoard = async (data) => {
    // return all error of validation
    return await boardSchema.validateAsync(data, { abortEarly: false });
};

const getBoard = async (id) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOne({ _id: id });
        return result;
    } catch (error) {
        console.log(error);
    }
}

const createBoard = async (data) => {
    try {
        const value = await validateBoard(data);
        const result = await getDB().collection(boardCollectionName).insertOne(value);

        return await getBoard(result.insertedId);
    } catch (error) {
        console.log(error);
    }
}

export const boardModel = { createBoard };