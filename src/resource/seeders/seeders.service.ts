// Libraries
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker, simpleFaker } from '@faker-js/faker';

// Entities
import { User } from 'src/models/users/entities/user.entity';
import UserDataExporter from './constants/userDataExporter.constants';
import { AuthenticationService } from 'src/controllers/authentication/authentication.service';

// Constants message
import * as message from '../../errors/messageGlobal.errors.json'

@Injectable()
export class SeedersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authenticationService: AuthenticationService,
    private readonly userDataExporter: UserDataExporter,
  ) { }

  async postData() {
    try {
      await this.createUser();
      Logger.log('Data seeded successfully!');
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(message.errorCompilingSeeder);
    }
  }

  async createUser() {
    const postData = [];
    for (let i = 0; i < 15; i++) {
      const id = simpleFaker.string.uuid();
      const name = faker.person.firstName();
      const lastName = faker.person.lastName();
      const dateDefault = faker.number.octal();
      const nickName = `${name}${lastName}${dateDefault}`;
      const email = faker.internet.email();
      const password = faker.internet.password()
      postData.push({ id, name, lastName, nickName, email, password, isState: true });
    }
    const allUserCredentials = await this.userDataExporter.getUsersData(this.authenticationService, postData);
    await this.userRepository.save(allUserCredentials);
  }
}
