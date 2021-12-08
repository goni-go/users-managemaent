import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import fs from "fs";
import cors from "cors";
import logger from './utils/logger';
import config from './utils/config';
import DBService from "./services/db";
import { StatusCodes } from 'http-status-codes';
import { verifyJWT, extractPassword } from './middlewares/jwt';
import UsersController from './controllers/user';
import { verifyRegisterRequest, verifyLoginRequest, verifyGetUsers } from './middlewares/requirements';

// init db
const records = JSON.parse(fs.readFileSync(`${__dirname}/data/records.json`, 'utf8'));
const dbService = new DBService();
dbService.initialize().then(() => {
    dbService.fillDatabaseWithRecords(records);
});

const app = express();

// log request - response
app.use((req, res, next) => {
    logger.info(`METHOD: [${req.method}] - URL: [${req.url}]`); // log request
    res.on('finish', () => { logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - BODY - [${req.body}] - STATUS: [${res.statusCode}]`); }); // log response
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// routes
const userController = new UsersController(dbService);
app.post('/register', verifyRegisterRequest, extractPassword, (req, res) => userController.register(req, res));
app.post('/login', verifyLoginRequest, extractPassword, (req, res) => userController.login(req, res));
app.get('/users', verifyGetUsers, verifyJWT, (req, res) => userController.getUsersByPagination(req, res));

// handle not found route
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logger.info(`Server is running ${config.server.url}`));
