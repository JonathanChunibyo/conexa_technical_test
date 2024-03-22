// Libraries
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entities
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password: passwordEntered, ...additionalUserData } = createUserDto;
      const hashedPassword = await bcrypt.hash(passwordEntered, 10);

      const user = this.userRepository.create({ ...additionalUserData, isState: true, password: hashedPassword });
      await this.userRepository.save(user);
      const { password, ...userDataCreated } = user;
      return userDataCreated;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error')
    }
  }
  
  find() {
    return this.userRepository.createQueryBuilder('user');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
