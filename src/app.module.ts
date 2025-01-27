import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './core/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AdministrationPanelModule } from './core/administration-panel/administration-panel.module';
import { JsonWebTokenService } from './common/service/json-web-token.service';
import { ArgonService } from './common/service/argon2.service';
import { EnvironmentService } from './common/service/environment.service';
import { NodemailerService } from './common/service/nodemailer.service';
import { JwtStrategyService } from './common/strategies/jwt.strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from './common/common.module';
import { UserRepository } from './core/user/repositories/user.repository';

@Module({
  imports: [
    DatabaseModule, 
    JwtModule.registerAsync({
      useFactory: async (environmentService: EnvironmentService) => ({
        secret: environmentService.get('SECRET_KEY'),
      }),
      inject: [EnvironmentService],
    }),
    UserModule, 
    CqrsModule.forRoot(), 
    AdministrationPanelModule, CommonModule,
  ],
  controllers: [],
  providers: [
    JsonWebTokenService, 
    ArgonService, 
    EnvironmentService, 
    NodemailerService, 
    JwtStrategyService,
    UserRepository
  ],
})
export class AppModule {}
