// libraries
import { Module } from '@nestjs/common';

// repositories
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [],
  providers: [
    UserRepository,
  ],
})
export class UserModule {}
