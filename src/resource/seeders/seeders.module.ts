// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Service
import { SeedersService } from './seeders.service';
import { AuthenticationService } from 'src/controllers/authentication/authentication.service';

// Controller
import { SeedersController } from './seeders.controller';

// Entities
import { AuthenticationCode } from 'src/models/authentication-code/entities/authentication-code.entity';
import { User } from 'src/models/users/entities/user.entity';
import { AuthenticationModule } from 'src/controllers/authentication/authentication.module';
import UserDataExporter from './constants/userDataExporter.constants';

@Module({
  controllers: [SeedersController],
  providers: [SeedersService, AuthenticationService, UserDataExporter],
  imports: [
    TypeOrmModule.forFeature([User, AuthenticationCode]),

    // Module method JWT
    AuthenticationModule
  ]
})
export class SeedersModule {}
