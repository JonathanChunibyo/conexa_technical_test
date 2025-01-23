import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './database/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AdministrationPanelModule } from './administration-panel/administration-panel.module';

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
