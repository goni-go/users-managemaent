const SERVER_PORT = process.env.SERVER_PORT || 8080;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${SERVER_PORT}`;
const PASSWORD_MIN_LENGTH = process.env.PASSWORD_MIN_LENGTH ? parseInt(process.env.PASSWORD_MIN_LENGTH) : undefined;

const config = {
    server: {
        url: SERVER_URL,
        port: SERVER_PORT,
    },
    token: {
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
        issuer: process.env.SERVER_TOKEN_ISSUER || 'coolIssuer',
        secret: process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret'
    },
    pagination: {
        pageSize: process.env.PAGE_SIZE || 15
    },
    user: {
        passwordMinLength: PASSWORD_MIN_LENGTH || 5
    }
};

export default config;