import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './models/users/users.module';
import { AuthenticationModule } from './controllers/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: +process.env.PORT_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),

    // Modules models app
    UsersModule,

    // Controllers models app
    AuthenticationModule,

  ],
  providers: [],
})
export class AppModule { }
