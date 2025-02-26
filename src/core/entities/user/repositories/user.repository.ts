// libraries
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

// repositories
import { BaseRepository } from "../../../../common/repositories/base.repository";
import { UserEntity } from "../entities/user.entity";

// dto
import { UserDto, UserGetDto, UserUpdateDto } from "../dto/user.dto";

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
