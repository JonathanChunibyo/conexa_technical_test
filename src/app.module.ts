// libraries
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpModule } from '@nestjs/axios';

// modules
import { DatabaseModule } from "./infrastructure/database/database.module";
import { UserModule } from "./repositories/user/user.module";
import { AdministrationPanelModule } from "./core/administration-panel/administration-panel.module";
import { CommonModule } from "./common/common.module";
import { CodeSmsModule } from "./repositories/code-sms/code-sms.module";
import { AuthenticationModule } from "./core/authentication/authentication.module";

// services
import { JsonWebTokenService } from "./common/service/json-web-token.service";
import { ArgonService } from "./common/service/argon2.service";
import { EnvironmentService } from "./common/service/environment.service";
import { NodemailerService } from "./common/service/nodemailer.service";
import { JwtStrategyService } from "./common/strategies/jwt.strategy.service";
import { StarwarsService } from "./common/service/starwars.service";

// repositories
import { UserRepository } from "./repositories/user/repositories/user.repository";

// interceptors
//import { LoggingInterceptor } from "./core/prometheus/interceptor/logging.interceptor";
import { PublicModule } from './core/public/public.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    // CqrsModule.forRoot(),
    AdministrationPanelModule,
    CommonModule,
    CodeSmsModule,
    AuthenticationModule,
    PublicModule,
    HttpModule
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
    JsonWebTokenService,
    ArgonService,
    EnvironmentService,
    NodemailerService,
    JwtStrategyService,
    UserRepository,
    StarwarsService
  ],
})
export class AppModule {}
