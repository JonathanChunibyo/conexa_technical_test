// Libraries
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Controller
import { AuthenticationController } from './authentication.controller';

// Services
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/models/users/users.service';
import { AuthenticationCodeService } from 'src/models/authentication-code/authentication-code.service';
import { JwtStrategy } from './strategies/jwt.strategy';

// Entities
import { User } from 'src/models/users/entities/user.entity';
import { AuthenticationCode } from 'src/models/authentication-code/entities/authentication-code.entity';

// Middlewares
import { UserExistMiddleware } from './middlewares/userExist.middlewares';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, UsersService, AuthenticationCodeService],
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY
    }),
    TypeOrmModule.forFeature([User, AuthenticationCode]),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})

export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserExistMiddleware).forRoutes(
      { path: 'authentication/login', method: RequestMethod.POST },
      { path: 'authentication/userCredentialValidation', method: RequestMethod.GET },
      );
  }
}
