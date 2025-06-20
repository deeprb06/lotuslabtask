import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Schema } from 'joi';
import { BAD_REQUEST } from '../utils/responseCode';

const VALIDATION_ERROR_MESSAGE = 'Validation failed';

export const validateBody = (schema: Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(BAD_REQUEST).json({
                message: VALIDATION_ERROR_MESSAGE,
                details: error.details.map((d) => d.message),
            });
            return;
        }
        next();
    };
};

export const validateQuery = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.query);
        if (error) {
            return res.status(BAD_REQUEST).json({
                message: VALIDATION_ERROR_MESSAGE,
                details: error.details.map((d) => d.message),
            });
        }
        next();
    };
};
