const SERVER_PORT = process.env.SERVER_PORT || 8080;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${SERVER_PORT}`;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

const config = {
    server: {
        url: SERVER_URL,
        port: SERVER_PORT,
    },
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

export default config;