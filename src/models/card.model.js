import Joi from 'joi';
import { getDB } from '*/config/mongodb';

const cardCollectionName = 'cards';

const cardSchema = Joi.object({
    boardId: Joi.string().required(),

    columnId: Joi.string().required(),

    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    cover: Joi.string().uri.default(null),

    created_at: Joi.date()
        .timestamp()
        .default(Date.now()),

    updated_at: Joi.date()
        .timestamp()
        .default(null),

    __destroy: Joi.boolean()
        .default(false)
});

const validateCard = async (data) => {
    // return all error of validation
    return await cardSchema.validateAsync(data, { abortEarly: false });
};

const getCard = async (id) => {
    try {
        const result = await getDB().collection(cardCollectionName).findOne({ _id: id });
        return result;
    } catch (error) {
        console.log(error);
    }
}

const createCard = async (data) => {
    try {
        const value = await validateCard(data);
        const result = await getDB().collection(cardCollectionName).insertOne(value);

        return await getCard(result.insertedId);
    } catch (error) {
        console.log(error);
    }
}

export const cardModel = { createCard };