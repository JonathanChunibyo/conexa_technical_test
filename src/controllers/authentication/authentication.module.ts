import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/models/users/users.service';
import { UserExistMiddleware } from './middlewares/userExist.middlewares';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, UsersService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})

export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserExistMiddleware).forRoutes('authentication/login');
  }
}
