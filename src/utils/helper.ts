import { Request, Response, NextFunction, RequestHandler } from 'express';
import { failureResponse, localize } from './messages';

export function getFormattedDate(): string {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    return `${month}-${day}-${year}`;
}

export const catchAsync = (fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>): RequestHandler => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return failureResponse({}, res, localize(err.message));
        });
    };
};
