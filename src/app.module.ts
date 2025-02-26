// libraries
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { APP_INTERCEPTOR } from "@nestjs/core";

// modules
import { DatabaseModule } from "./infrastructure/database/database.module";
import { UserModule } from "./core/entities/user/user.module";
import { AdministrationPanelModule } from "./core/administration-panel/administration-panel.module";
import { CommonModule } from "./common/common.module";
import { CodeSmsModule } from "./core/entities/code-sms/code-sms.module";
import { AuthenticationModule } from "./core/authentication/authentication.module";

// services
import { JsonWebTokenService } from "./common/service/json-web-token.service";
import { ArgonService } from "./common/service/argon2.service";
import { EnvironmentService } from "./common/service/environment.service";
import { NodemailerService } from "./common/service/nodemailer.service";
import { JwtStrategyService } from "./common/strategies/jwt.strategy.service";

// repositories
import { UserRepository } from "./core/entities/user/repositories/user.repository";

// interceptors
import { LoggingInterceptor } from "./core/prometheus/interceptor/logging.interceptor";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CqrsModule.forRoot(),
    AdministrationPanelModule,
    CommonModule,
    CodeSmsModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    JsonWebTokenService,
    ArgonService,
    EnvironmentService,
    NodemailerService,
    JwtStrategyService,
    UserRepository,
  ]
})
export class AppModule {}
