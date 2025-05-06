// libraries
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

// services
import { EnvironmentService } from "../../common/service/environment.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvironmentService],
      useFactory: (environmentService: EnvironmentService) => {
        return {
          type: "mariadb",
          host: environmentService.get("HOST_DB"),
          port: Number(environmentService.get("PORT_DB")),
          username: environmentService.get("USER_NAME_DB"),
          password: environmentService.get("PASSWORD_DB"),
          database: environmentService.get("NAME_DB"),
          entities: [
            path.resolve(
              __dirname,
              "..",
              "..",
              "repositories",
              "**",
              "entities",
              "*.entity.{ts,js}"
            ),
          ],
          // ! ALWAYS FALSE IN PROD
          synchronize: false,
          autoLoadEntities: false,
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
