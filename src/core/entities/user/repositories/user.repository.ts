import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../common/repositories/base.repository";
import { DataSource } from "typeorm";
import { UserDto, UserGetDto, UserUpdateDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends BaseRepository<
  UserEntity,
  UserDto,
  UserUpdateDto,
  UserGetDto
> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
