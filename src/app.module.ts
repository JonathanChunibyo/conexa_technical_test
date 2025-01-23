import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './core/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AdministrationPanelModule } from './core/administration-panel/administration-panel.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    CqrsModule.forRoot(), 
    AdministrationPanelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
