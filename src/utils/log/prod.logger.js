import winston from "winston";
import { customLevelOptions } from "./loggerCustomLevelOptions.js";

export const logger = winston.createLogger({
  levels: customLevelOptions.level,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./src/log/errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});
