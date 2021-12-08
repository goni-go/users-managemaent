import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../utils/config';
import logger from '../utils/logger';

const ERROR_MSG = 'Something went wrong';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Verifying JWT');

    const clientJWT = req.headers.authorization?.split(' ')[1];
    if (!clientJWT) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is mandatory' });
    }
    
    try {
        jwt.verify(clientJWT, config.token.secret);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: ERROR_MSG, more_info: error });
    }

    return next();
};

export const extractPassword = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Extracting JWT');

    const clientJWT = req.headers.authorization?.split(' ')[1];
    if (!clientJWT) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is mandatory' });
    }

    try {
        const decoded = jwt.verify(clientJWT, config.token.secret);
        res.locals.client = (decoded as JwtPayload).client;
        return next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: ERROR_MSG, more_info: error });
    }
}