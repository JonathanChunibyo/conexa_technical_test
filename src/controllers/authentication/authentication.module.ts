// Libraries
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Controller
import { AuthenticationController } from './authentication.controller';

// 
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/models/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { User } from 'src/models/users/entities/user.entity';

import { UserExistMiddleware } from './middlewares/userExist.middlewares';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, UsersService],
  imports: [
    ConfigModule.forRoot(),
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
