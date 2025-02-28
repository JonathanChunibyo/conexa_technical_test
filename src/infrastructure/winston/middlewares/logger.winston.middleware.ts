import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { logger } from "../logger.winston";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req["startTime"] = process.hrtime();
    res.on("finish", () => {
      const [seconds, nanoseconds] = process.hrtime(req["startTime"]);
      const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
      const [method, originalUrl] = [req.method, req.originalUrl];
      if (res.statusCode >= 400) {
        const body = JSON.stringify(req.body);
        const params = JSON.stringify(req.params);
        const headers = JSON.stringify(req.headers);
        const query = JSON.stringify(req.query);
        logger.error(
          `Endpoint {${originalUrl}, ${method}} +${durationMs}ms Status: [${res.statusCode}] { Body: ${body}, Params: ${params}, Headers: ${headers}, Query:${query} }`
        );
        
      } else {
        logger.log(
          `Endpoint \x1B[32m{${originalUrl}, ${method}}\x1B[39m \x1B[33m+${durationMs}ms\x1B[39m`
        );
      }
    });

    next();
  }
}
