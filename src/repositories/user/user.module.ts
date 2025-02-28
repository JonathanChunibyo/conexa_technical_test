// libraries
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// repositories
import { UserRepository } from './repositories/user.repository';

// handlers
import { CreateUserHandler } from './commands/handlers/create-user.handler';
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
