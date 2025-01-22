import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler/create-user.handler';
import { UserRepository } from './user.repository';
import { SendWelcomeEmailHandler } from './events/handlers/send-welcome-email.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    CreateUserHandler,
    SendWelcomeEmailHandler,
    UserRepository,
  ],
})
export class UserModule {}
