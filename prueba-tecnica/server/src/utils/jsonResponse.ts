import { Response } from 'express';

const jsonResponse = (res: Response, statusCode: number, data: any): void => {
    res.status(statusCode).json({
        error: false,
        data
    });
};

export default jsonResponse;
