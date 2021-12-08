import { expect } from "chai";
import axios from "axios";
import config from "../src/utils/config";
import jwt from "jsonwebtoken";

const createTokenForSendingPassword = (password: string): string => {
    const now = new Date().getTime();
    const expirationTime = now + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    const token = jwt.sign({ client: password }, Buffer.from(config.token.secret), {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds
    });
    
    return token;
};

describe('End 2 End Happy Flow', function () {
    // this.timeout(200000000);
    const user = {
        email: `${new Date().toISOString()}@gmail.com`,
        firstName: 'John',
        lastName: 'Doe',
        description: 'Software Developer'
    };
    const password = '12345678';

    let clientToken: string, serverToken: string;

    before(() => {
        clientToken = createTokenForSendingPassword(password);
    })

    it('Should return 201 with the user after successfull regitration', async function() {
        try {
            const response = await axios.post(`${config.server.url}/register`, user, {
                headers: { 'Authorization': `Bearer ${clientToken}` }
            });
            expect(response.status).to.equal(201);
            expect(response.data.user).to.deep.equal(user);
        } catch (error) {
            expect.fail(error);
        }
    });

    it('Should return 200 with token after successfull login', async function() {
        let response
        try {
            response = await axios.post(`${config.server.url}/login`, { email: user.email }, {
                headers: { 'Authorization': `Bearer ${clientToken}` }
            });
        } catch (error) {
            expect.fail(error);
        }
        expect(response.status).to.equal(200);
        expect(response.data).to.have.all.keys('user', 'token', 'message');
        expect(response.data.user).to.deep.equal(user);
        serverToken = response.data.token; // for next test
    });

    it('Should return 200 with all users after success get all users', async function() {
        let response
        try {
            response = await axios.get(`${config.server.url}/users`, {
                headers: { 'Authorization': `Bearer ${serverToken}` },
                params: {
                    pageSize: 10000, // so we can get all users
                    pageNumber: 1
                }
            });
        } catch (error) {
            expect.fail(error);
        }
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
        const lastUser = response.data[response.data.length - 1];
        expect(lastUser).to.deep.equal(user);
    })
})