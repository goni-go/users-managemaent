import jwt from 'jsonwebtoken';
import config from '../utils/config';
import logger from '../utils/logger';
import { FullUserType, UserType } from '../types/user';

const signJWT = (user: FullUserType | UserType): string => {
    const now = new Date().getTime();
    const expirationTime = now + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logger.info(`Going to sign a JWT for user: ${user.email}`);

    const token = jwt.sign({ email: user.email }, Buffer.from(config.token.secret), {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds
    });
    
    return token;
};

export default signJWT;