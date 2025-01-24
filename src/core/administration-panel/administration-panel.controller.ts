import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiValidateFile } from 'src/infrastructure/documentation/decorators/swagger-decorator';
import { UserRepository } from '../user/repositories/user.repository';
import { UserDto } from '../user/dto/user.dto';
import { API_OPERATION_SWAGGER } from './documentation/swagger-constant';

@Controller('administration-panel')
export class AdministrationPanelController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  @Post("create-user")
  @ApiValidateFile(API_OPERATION_SWAGGER['create-user'])
  async createUser(@Body() createUserDto: UserDto) {
    const user = this.userRepository.create(createUserDto);
    console.log(user);
    return user;
    // return await this.commandBus.execute(new CreateUserCommand(
    //   createUserDto.name,
    //   createUserDto.nickName,
    //   createUserDto.email,
    //   createUserDto.password,
    // ));
  }
}
