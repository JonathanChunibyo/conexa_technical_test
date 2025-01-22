import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './database/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AdministrationPanelModule } from './administration-panel/administration-panel.module';
import { DocumentationModule } from './documentation/documentation.module';

@Module({
  imports: [DatabaseModule, UserModule, CqrsModule.forRoot(), AdministrationPanelModule, DocumentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
