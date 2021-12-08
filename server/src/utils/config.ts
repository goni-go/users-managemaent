const SERVER_PORT = process.env.SERVER_PORT || 8080;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${SERVER_PORT}`;

const config = {
    server: {
        url: SERVER_URL,
        port: SERVER_PORT,
    },
    token: {
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
        issuer: process.env.SERVER_TOKEN_ISSUER || 'coolIssuer',
        secret: process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret'
    }
};

export default config;