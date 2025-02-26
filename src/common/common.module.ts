import { Global, Module } from "@nestjs/common";
import { EnvironmentService } from "./service/environment.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

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
