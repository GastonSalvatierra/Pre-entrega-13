import winston from "winston";
import config from "./config.js";

//Custom logger options:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'white',
        fatal: 'magenta'
    }
};

//Custom Logger:
export const devLogger = winston.createLogger({
    //Levels:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'warning', //Cambiamos el logger level name.
                format: winston.format.simple()
            }
        )
    ]
});

//Creating our logger:
export const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    //Declare transports:
    transports: [
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({ filename: './errors.log', level: 'warning' })
    ]
});

//Declare a middleware:
export const addLogger = (req, res, next) => {
    if (config.environment === 'production') {
        req.logger = prodLogger;
        req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    } else {
        req.logger = devLogger;
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    }
    next();
};

