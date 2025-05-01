import * as winston from "winston";
import "winston-daily-rotate-file";
import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import { WinstonModule } from "nest-winston";

const APP_ENV = process.env.APP_ENV?.trim() || "local";

dayjs.extend(utc);
dayjs.extend(timezone);

const customDailyRotationFile = (level: string, filename: string) => {
  const formatInfoLevel =
    level === "info"
      ? winston.format((info) => info.level === "info" ? info : false)()
      : null;
  return new winston.transports.DailyRotateFile({
    filename,
    level,
    format: winston.format.combine(
      ...(formatInfoLevel ? [formatInfoLevel] : []), 
      winston.format.timestamp({
        format: () =>
          dayjs().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
      }),
      winston.format.printf((error) => {
        const [date, hour] = dayjs().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss").split(" ");
        const message = String(error?.message).trim().replace(/\u001b\[\d{1,2}m/g, "");
        return `[Winston] - ${date}, ${hour} [${error.level}]: ${message}`;
      })
    ),
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxFiles: "30d",
  });
};

const transports = [
  customDailyRotationFile("error", "logs/error/error.log"),
  customDailyRotationFile("info", "logs/success/success.log")
];

export const logger = WinstonModule.createLogger({
  transports:
    APP_ENV === "local"
      ? [
          ...transports,
          new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
              winston.format((info) => {
                return info.level === "info" ? info : false;
              })(),
              winston.format.cli(),
              winston.format.timestamp(),
              winston.format.printf((info) => {
                const [date, hour] = dayjs()
                  .tz("America/Bogota")
                  .format("YYYY-MM-DD HH:mm:ss")
                  .split(" ");
                const message = String(info?.message).trim();
                return `\x1B[32m[Winston] -\x1B[39m ${date}, ${hour} [${info.level}]: ${message}`;
              })
            ),
          }),
        ]
      : transports,
});