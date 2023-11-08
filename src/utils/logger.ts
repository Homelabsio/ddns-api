import * as winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

function level(): string {
    var env: string = process.env.NODE_ENV || 'development';
    var isDevelopment: boolean = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
}

const colors: winston.config.AbstractConfigSetColors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'green',
  }
winston.addColors(colors);

let format: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
    ),
  )

let httpFilter: winston.Logform.FormatWrap = winston.format((info, opts) => { 
	return info.level === 'http' ? info : false 
})

let options = {
    console:{
        handleExceptions: true,
        format: winston.format.combine(winston.format.colorize({ all: false }), format)
    },
    error:{
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(format),
    },
    access:{
        filename: 'logs/access.log',
        level: 'http',
        format: winston.format.combine(httpFilter(), format),
    },
    combined:{
        filename: 'logs/combined.log',
        format: winston.format.combine(format),
    }
}
const logger = winston.createLogger({
    level: level(),
    levels: levels,
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.error),
        new winston.transports.File(options.access),
        new winston.transports.File(options.combined),
    ],
  });

export { logger }