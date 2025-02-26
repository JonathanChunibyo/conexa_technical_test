// Libraries
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { transports, format } from "winston";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

// module
import { AppModule } from "./app.module";

// Documentation
import { swaggerInit } from "./infrastructure/documentation/swagger";

// Logs
import "winston-daily-rotate-file";

// Config dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new transports.DailyRotateFile({
        filename: "logs/error.log",
        level: "error",
        format: format.combine(
          format.timestamp({
            format: () =>
              dayjs().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
          }),
          format.json()
        ),
        datePattern: "YYYY-MM-DD",
        zippedArchive: false,
        maxFiles: "30d",
      }),
      new transports.Console({
        format: format.combine(
          format.cli(),
          format.timestamp(),
          format.printf((info) => {
            const date =
              typeof info.timestamp === "string" ||
              typeof info.timestamp === "number"
                ? dayjs(info.timestamp)
                    .tz("America/Bogota")
                    .format("YYYY-MM-DD HH:mm:ss")
                : dayjs().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
            return `* ${date} [${info.level}]: ${info.message}`;
          })
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, { logger });

  app.useGlobalPipes(new ValidationPipe());
  swaggerInit(app);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
