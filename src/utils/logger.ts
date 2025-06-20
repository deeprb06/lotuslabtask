import { createLogger, format, transports, Logger } from 'winston';
import envConfig from '../config';
import { getFormattedDate } from './helper';

const loggerFormat = format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
    format.printf((info) =>
        info.stack
            ? `[${info.timestamp}] [${info.level}]: ${info.message} : ${info.stack}`
            : `[${info.timestamp}] [${info.level}]: ${info.message}`,
    ),
);


function formatFile(level: string, flag = false): transports.FileTransportOptions {
    return {
        filename: `storage/logs/${level}/${getFormattedDate()}.log`,
        level,
        format: format.combine(
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.align(),
            format.printf((info) =>
                flag
                    ? `${info.level}: [${info.timestamp}]: ${info.stack ?? info.message}`
                    : `${info.level}: [${info.timestamp}]: ${info.message}`,
            ),
        ),
    };
}

const logger: Logger = createLogger({
    defaultMeta: {
        server: envConfig.SERVER_ENVIRONMENT,
        logType: 'simple',
    },
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), loggerFormat),
        }),
        new transports.File(formatFile('error', true)),
        new transports.File(formatFile('info')),
    ],
});

export default logger;
