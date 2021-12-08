import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { FullUserType, AuthUserType } from '../types/user';
import DBService from "../services/db";
import signJWT from '../utils/jwt-signer';
import logger from '../utils/logger';
import StatusCodes from "http-status-codes";

const ERROR_MSG = 'Something went wrong';

class UsersController {
    private dbService: DBService;

    constructor(dbServide: DBService) {
        this.dbService = dbServide;
    }

    public async register(req: Request, res: Response) {
        const userInfo: FullUserType = req.body;
        // get password and delete it from response
        userInfo.password = res.locals.client;
        delete res.locals.client;

        let hashedPassword;
        try {
            hashedPassword = await bcryptjs.hash(userInfo.password, 10);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message, more_info: error })
        }

        userInfo.password = hashedPassword; // override
        try {
            await this.dbService.saveUser(userInfo);
            delete userInfo.password; // remove passwrod so we will not send it
            return res.status(StatusCodes.CREATED).json({ user: userInfo });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: ERROR_MSG, more_info: error.errors[0].message });
        }
    }

    public async login(req: Request, res: Response) {
        const authUser: AuthUserType = {
            email: req.body.email,
            password: res.locals.client
        };
        delete res.locals.client;

        let userFromDb: FullUserType;
        try {
            userFromDb = await this.dbService.findUserByEmail(authUser.email);
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ messgae: 'User was not authorized' });
        }

        if (!userFromDb) {
            return res.status(StatusCodes.NOT_FOUND).json({ messgae: 'User was not fount' });
        }

        let isPasswordMatch;
        try {
            isPasswordMatch = await bcryptjs.compare(authUser.password, userFromDb.password);
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ messgae: 'Password is incorrect' });
        }

        if (!isPasswordMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ messgae: 'Password is incorrect' });
        }

        try {
            const token = signJWT(userFromDb);
            delete userFromDb.password; // remove before send to client
            return res.status(StatusCodes.OK).json({ message: 'Logged in successfully', token, user: userFromDb });
        } catch (error) {
            logger.error('JWT sign failed: ', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ERROR_MSG, more_info: error });
        }
    }

    public async getUsersByPagination(req: Request, res: Response) {
        try {
            const { pageSize, pageNumber } = req.query;
            const users = await this.dbService.findAllByPagination(parseInt(pageSize as string), parseInt(pageNumber as string));
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: ERROR_MSG, more_info: error });
        }
    }
};

export default UsersController;