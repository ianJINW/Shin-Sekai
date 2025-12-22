import pino from "pino";
import { pinoHttp } from "pino-http";
import pretty from "pino-pretty";

const isDev = process.env.NODE_ENV !== "production";

const stream = isDev
  ? pretty({
      colorize: true,
    translateTime: "SYS:standard",
  })
  : undefined;

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  stream
);


export const httpLogger = pinoHttp({
  logger, 
    customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  }
})