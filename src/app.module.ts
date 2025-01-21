import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [DatabaseModule, UserModule, CqrsModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
