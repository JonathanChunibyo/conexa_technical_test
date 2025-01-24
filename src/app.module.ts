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

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    CqrsModule.forRoot(), 
    AdministrationPanelModule,
  ],
  controllers: [],
  providers: [JsonWebTokenService, ArgonService, EnvironmentService, NodemailerService, JwtStrategyService],
})
export class AppModule {}
