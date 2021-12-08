import { Logger } from "@tsed/logger";

const logger = new Logger("Users-Management-System");

logger.appenders
    .set("std-log", {
        type: "stdout",
        levels: ["info", "debug"],
    })
    .set("error-log", {
        type: "stderr",
        levels: ["error"]
    });

export default logger;