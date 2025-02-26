import { Module } from "@nestjs/common";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { UserModule } from "./core/entities/user/user.module";
import { CqrsModule } from "@nestjs/cqrs";
import { AdministrationPanelModule } from "./core/administration-panel/administration-panel.module";
import { JsonWebTokenService } from "./common/service/json-web-token.service";
import { ArgonService } from "./common/service/argon2.service";
import { EnvironmentService } from "./common/service/environment.service";
import { NodemailerService } from "./common/service/nodemailer.service";
import { JwtStrategyService } from "./common/strategies/jwt.strategy.service";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "./common/common.module";
import { UserRepository } from "./core/entities/user/repositories/user.repository";
import { CodeSmsModule } from "./core/entities/code-sms/code-sms.module";
import { AuthenticationModule } from "./core/authentication/authentication.module";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
// import { makeCounterProvider, makeHistogramProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
// import { MetricsService } from './common/service/prometheus.service';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./core/prometheus/interceptor/logging.interceptor";
// import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
// import { PrometheusModule } from './core/prometheus/prometheus.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CqrsModule.forRoot(),
    AdministrationPanelModule,
    CommonModule,
    CodeSmsModule,
    AuthenticationModule,
    //PrometheusModule.register(),
    // PrometheusModule
  ],
  controllers: [],
  providers: [
    // MetricsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // makeCounterProvider({
    //   name: 'http_requests_total',
    //   help: 'Número total de solicitudes HTTP',
    //   labelNames: ['route', 'method'],
    // }),
    // makeHistogramProvider({
    //   name: 'http_request_duration_seconds',
    //   help: 'Duración de las solicitudes HTTP',
    //   labelNames: ['route', 'method'],
    //   buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
    // }),
    JsonWebTokenService,
    ArgonService,
    EnvironmentService,
    NodemailerService,
    JwtStrategyService,
    UserRepository,
  ]
})
export class AppModule {}
