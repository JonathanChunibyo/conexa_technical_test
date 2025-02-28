// libraries
import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

// services
import { EnvironmentService } from "./service/environment.service";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (environmentService: EnvironmentService) => ({
        secret: environmentService.get("SECRET_KEY"),
      }),
      inject: [EnvironmentService],
    }),
  ],
  providers: [EnvironmentService, JwtService],
  exports: [EnvironmentService, JwtModule],
})
export class CommonModule {}
