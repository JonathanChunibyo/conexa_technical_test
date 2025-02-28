// Libraries
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

// Module
import { AppModule } from "./app.module";

// Documentation
import { swaggerInit } from "./infrastructure/documentation/swagger";

// Logs
import { LoggingMiddleware } from "./infrastructure/winston/middlewares/logger.winston.middleware";

// Config dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

// Environment variables
const APP_ENV = process.env.APP_ENV?.trim() || "local";
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

async function bootstrap() {
  try {
    // Config Logger
    if (APP_ENV === "production") {
      Logger.overrideLogger(["error", "warn"]);
    }

    const logger = new Logger("Bootstrap");
    logger.debug("🚀 Aplicación iniciando...");

    const app = await NestFactory.create(AppModule);

    // Validation data
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // Middleware logs
    app.use(new LoggingMiddleware().use);

    // Documentation Swagger
    swaggerInit(app);

    // Init server
    await app.listen(PORT);
    logger.verbose(`✅ Servidor corriendo en: http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
    process.exit(1);
  }
}

bootstrap();
