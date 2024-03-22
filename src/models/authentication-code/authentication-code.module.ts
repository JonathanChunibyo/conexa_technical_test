import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationCode } from './entities/authentication-code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationCode]),
  ],
})
export class AuthenticationCodeModule {}
