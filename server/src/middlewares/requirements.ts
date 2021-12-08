import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const verifyRegisterRequest = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Authorization header is mandatory' });
    }

    const missingFields: string[] = [];
    ['email', 'firstName', 'lastName'].forEach(property => {
        if (!req.body[property]) {
            missingFields.push(property);
        }
    })

    if (missingFields.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `Required fields (${missingFields.join(', ')}) are missing` });
    }

    return next();
}

export const verifyLoginRequest = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is mandatory' });
    }

    if (!req.body.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `Email field is mandatory` });
    }

    return next();
}

export const verifyGetUsers = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is mandatory' });
    }

    const { pageSize, pageNumber } = req.query;
    const parsedPageSize = parseInt(pageSize as string);
    const parsedPageNumber = parseInt(pageNumber as string);

    if (!pageSize || !pageNumber || isNaN(parsedPageSize) || isNaN(parsedPageNumber) || parsedPageSize <= 0 || parsedPageNumber <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Params: pageSize and pageNumber are mandatory and should be a whole positive number' });
    }

    return next();
}