import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/base.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../entities/user.entity/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
