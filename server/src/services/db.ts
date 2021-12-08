import { Sequelize } from "sequelize";
import { UserType, FullUserType } from "../types/user";
import { defineUserModel } from "../models/user";
import logger from "../utils/logger";

class DBService {
    private sequelize: Sequelize

    constructor() {
        this.sequelize = new Sequelize("sqlite::memory:", { logging: msg => logger.debug(msg) });
        defineUserModel(this.sequelize);
    }

    public async initialize(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync();
            logger.info("Connection to DB has been established successfully");
        } catch (err) {
            logger.error(`Unable to connect to the DB: ${err}`);
            throw err;
        }
    }

    public async fillDatabaseWithRecords(records: FullUserType[]): Promise<void> {
        const promises = records.map(record => this.saveUser(record as FullUserType));
        await Promise.all(promises);
    }

    public async saveUser(user: FullUserType): Promise<void> {
        await this.sequelize.models.users.create(user);
        logger.info(`User ${user.email} was insert successfully to the DB`);
    }

    public async findUserByEmail(email: string): Promise<FullUserType> {
        const model = await this.sequelize.models.users.findByPk(email);
        let user: FullUserType = {
            email: (model as any).dataValues.email,
            password: (model as any).dataValues.password,
            firstName: (model as any).dataValues.firstName,
            lastName: (model as any).dataValues.lastName,
            description: (model as any).dataValues.description,
        };
        logger.info(`User ${user.email} was found successfully in the DB`);
        return user;
    }

    public async findAllByPagination(pageSize: number, pageNumber: number): Promise<UserType[]> {
        const offset = pageSize * (pageNumber - 1);
        const models = await this.sequelize.models.users.findAll({ offset, limit: pageSize });
        const users = models.map(model => {
            const user: UserType = {
                email: (model as any).dataValues.email,
                firstName: (model as any).dataValues.firstName,
                lastName: (model as any).dataValues.lastName,
                description: (model as any).dataValues.description,
            }
            return user;
        });
        return users;
    }
}

export default DBService;