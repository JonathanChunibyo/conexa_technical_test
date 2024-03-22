import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

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

  async findAll(
    where: Record<string, any>,
    select: string[]
  ): Promise<User[]> {
    return await this.userRepository.createQueryBuilder('user')
      .select(select)
      .where(where)
      .getMany();
  }

  async findOne(
    where: Record<string, any>,
    select: string[]
  ) {
    return await this.userRepository.createQueryBuilder('user')
      .select(select)
      .where(where)
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
