// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules controllers
import { AuthenticationModule } from './controllers/authentication/authentication.module';

// Module models
import { UsersModule } from './models/users/users.module';
import { AuthenticationCodeModule } from './models/authentication-code/authentication-code.module';
import { SeedersModule } from './resource/seeders/seeders.module';
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
      synchronize: false,
      logging: true
    }),

    // Modules models app
    UsersModule,
    AuthenticationCodeModule,

    // Modules controllers app
    AuthenticationModule,

    // Seeders module app
    SeedersModule,

  ],
  providers: [],
})
export class AppModule { }
