import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto, UserUpdateDto } from './user.dto';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, UserDto, UserUpdateDto> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
