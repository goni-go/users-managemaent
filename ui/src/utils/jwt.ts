import config from "./config";
import jwt from "jsonwebtoken";
import { AuthType, FullUserType } from "../types/user";

export const createToken = (user: FullUserType | AuthType): string => {
    const now = new Date().getTime();
    const expirationTime = now + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    const token = jwt.sign({ client: user.password }, Buffer.from(config.token.secret), {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds
    });
    
    return token;
};