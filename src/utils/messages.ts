import { BAD_REQUEST, CREATED, RESPONSE_CODE, SUCCESS } from './responseCode';
import { response } from 'express';

const messages = {
    create: '{module} has been created successfully.',
    list: 'All {module} has been fetched successfully.',
    get: '{module} has been retrieve successfully.',
    createError: 'Error accured while creating the {module}.',
    getError: '{module} not found.',
    listError: "{module} not found or you can't get all list",
};

export const localize = (module: keyof typeof messages, key?: string) => {
    if (key) {
        const message = messages[module].replace('{module}', key);
        return message;
    }
    return messages[module];
}

export const failureResponse = (data: any, res: typeof response, message: string) => {
    return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        code: RESPONSE_CODE.ERROR,
        message,
    });
};

export const createdDocumentResponse = (data: any, res: typeof response, message: string) => {
    return res.status(CREATED).json({
        status: CREATED,
        code: RESPONSE_CODE.SUCCESS,
        message,
        data: data,
    });
};

export const successResponse = (data: any, res: typeof response, message: string) => {
    return res.status(SUCCESS).json({
        status: SUCCESS,
        code: RESPONSE_CODE.SUCCESS,
        message,
        data: data,
    });
};
